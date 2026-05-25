from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr

from app.models import OrderStatus, PaymentMethod


class OrderCreate(BaseModel):
    customer_name: str
    customer_email: EmailStr
    payment_method: PaymentMethod


class OrderResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    customer_name: str
    customer_email: str
    amount: float
    status: OrderStatus
    payment_method: PaymentMethod
    created_at: datetime
    download_token: Optional[str] = None


class AdminLogin(BaseModel):
    email: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class OrderStatusUpdate(BaseModel):
    status: OrderStatus


class EmailRequest(BaseModel):
    order_id: str
