import enum

from sqlalchemy import Boolean, Column, DateTime, Enum, Float, String
from sqlalchemy.sql import func

from app.database import Base


class PaymentMethod(str, enum.Enum):
    card = "card"
    crypto = "crypto"
    click = "click"
    payme = "payme"


class OrderStatus(str, enum.Enum):
    pending = "pending"
    paid = "paid"
    delivered = "delivered"
    refunded = "refunded"


class Order(Base):
    __tablename__ = "orders"

    id = Column(String, primary_key=True)
    customer_name = Column(String, nullable=False)
    customer_email = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    status = Column(Enum(OrderStatus), default=OrderStatus.pending)
    payment_method = Column(Enum(PaymentMethod), nullable=False)
    payment_id = Column(String, nullable=True)
    download_token = Column(String, nullable=True, unique=True)
    download_count = Column(String, default="0")
    email_sent = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
