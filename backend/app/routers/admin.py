from typing import List, Optional

from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session

from app.config import settings
from app.database import get_db
from app.models import Order, OrderStatus
from app.schemas import (
    AdminLogin,
    OrderResponse,
    OrderStatusUpdate,
    TokenResponse,
)
from app.services.email_service import send_download_email
from app.services import order_service
from app.utils.security import (
    create_admin_token,
    generate_download_token,
    verify_admin_token,
)

router = APIRouter(prefix="/api/admin", tags=["admin"])


def get_admin(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Unauthorized")
    token = authorization.split(" ")[1]
    if not verify_admin_token(token):
        raise HTTPException(status_code=401, detail="Invalid token")
    return True


@router.post("/login", response_model=TokenResponse)
def admin_login(credentials: AdminLogin):
    if (
        credentials.email != settings.ADMIN_EMAIL
        or credentials.password != settings.ADMIN_PASSWORD
    ):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_admin_token()
    return {"access_token": token}


@router.get("/orders", response_model=List[OrderResponse])
def get_all_orders(db: Session = Depends(get_db), _=Depends(get_admin)):
    return db.query(Order).order_by(Order.created_at.desc()).all()


@router.patch("/orders/{order_id}/status")
def update_order_status(
    order_id: str,
    update: OrderStatusUpdate,
    db: Session = Depends(get_db),
    _=Depends(get_admin),
):
    order = order_service.get_order_by_id(db, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    order_service.update_order_status(db, order, update.status)
    return {"message": "Status updated", "order_id": order_id}


@router.post("/orders/{order_id}/send-email")
def send_email_to_customer(
    order_id: str,
    db: Session = Depends(get_db),
    _=Depends(get_admin),
):
    order = order_service.get_order_by_id(db, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if not order.download_token:
        order.download_token = generate_download_token()
        db.commit()
    success = send_download_email(
        order.customer_name,
        order.customer_email,
        order.id,
        order.download_token,
    )
    if success:
        order.email_sent = True
        db.commit()
        return {"message": "Email sent successfully"}
    raise HTTPException(status_code=500, detail="Failed to send email")


@router.get("/stats")
def get_stats(db: Session = Depends(get_db), _=Depends(get_admin)):
    orders = db.query(Order).all()
    total_revenue = sum(
        o.amount
        for o in orders
        if o.status in (OrderStatus.paid, OrderStatus.delivered)
    )
    return {
        "total_orders": len(orders),
        "total_revenue": total_revenue,
        "paid_orders": len([o for o in orders if o.status == OrderStatus.paid]),
        "pending_orders": len(
            [o for o in orders if o.status == OrderStatus.pending]
        ),
        "delivered_orders": len(
            [o for o in orders if o.status == OrderStatus.delivered]
        ),
    }
