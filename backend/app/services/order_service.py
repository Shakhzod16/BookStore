from sqlalchemy.orm import Session

from app.config import settings
from app.models import Order, OrderStatus
from app.schemas import OrderCreate
from app.utils.security import generate_download_token, generate_order_id


def create_order(db: Session, order_data: OrderCreate) -> Order:
    order = Order(
        id=generate_order_id(),
        customer_name=order_data.customer_name,
        customer_email=order_data.customer_email,
        amount=settings.BOOK_PRICE,
        payment_method=order_data.payment_method,
        status=OrderStatus.pending,
    )
    db.add(order)
    db.commit()
    db.refresh(order)
    return order


def get_order_by_id(db: Session, order_id: str) -> Order | None:
    return db.query(Order).filter(Order.id == order_id).first()


def mark_order_paid(db: Session, order: Order, payment_id: str | None = None) -> Order:
    order.status = OrderStatus.paid
    if payment_id:
        order.payment_id = payment_id
    if not order.download_token:
        order.download_token = generate_download_token()
    db.commit()
    db.refresh(order)
    return order


def update_order_status(db: Session, order: Order, status: OrderStatus) -> Order:
    order.status = status
    if status == OrderStatus.paid and not order.download_token:
        order.download_token = generate_download_token()
    db.commit()
    db.refresh(order)
    return order
