from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import OrderStatus
from app.schemas import OrderResponse
from app.services.email_service import send_download_email
from app.services import order_service
from app.services.payment_service import confirm_demo_payment, verify_stripe_webhook

router = APIRouter(prefix="/api/payments", tags=["payments"])


@router.post("/confirm/{order_id}", response_model=OrderResponse)
def confirm_payment(order_id: str, db: Session = Depends(get_db)):
    """Demo endpoint: mark order as paid after checkout simulation."""
    order = order_service.get_order_by_id(db, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order.status != OrderStatus.pending:
        return order
    order = confirm_demo_payment(db, order)
    send_download_email(
        order.customer_name,
        order.customer_email,
        order.id,
        order.download_token or "",
    )
    order.status = OrderStatus.delivered
    order.email_sent = True
    db.commit()
    db.refresh(order)
    return order


@router.post("/webhook/stripe")
async def stripe_webhook(request: Request, db: Session = Depends(get_db)):
    payload = await request.body()
    signature = request.headers.get("stripe-signature", "")
    event = verify_stripe_webhook(payload, signature)
    if not event:
        raise HTTPException(status_code=400, detail="Invalid webhook")

    if event.get("type") == "checkout.session.completed":
        session = event.get("data", {}).get("object", {})
        order_id = session.get("metadata", {}).get("order_id")
        if order_id:
            order = order_service.get_order_by_id(db, order_id)
            if order and order.status == OrderStatus.pending:
                confirm_demo_payment(db, order, payment_id=session.get("id"))
                if order.download_token:
                    send_download_email(
                        order.customer_name,
                        order.customer_email,
                        order.id,
                        order.download_token,
                    )
                    order.email_sent = True
                    order.status = OrderStatus.delivered
                    db.commit()

    return {"received": True}
