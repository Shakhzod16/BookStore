import stripe
from sqlalchemy.orm import Session

from app.config import settings
from app.models import Order
from app.services.order_service import mark_order_paid

if settings.STRIPE_SECRET_KEY:
    stripe.api_key = settings.STRIPE_SECRET_KEY


def verify_stripe_webhook(payload: bytes, signature: str) -> dict | None:
    if not settings.STRIPE_WEBHOOK_SECRET:
        return None
    try:
        return stripe.Webhook.construct_event(
            payload, signature, settings.STRIPE_WEBHOOK_SECRET
        )
    except Exception:
        return None


def confirm_demo_payment(db: Session, order: Order) -> Order:
    """Simulate successful payment for non-Stripe methods (demo)."""
    return mark_order_paid(db, order, payment_id=f"demo-{order.id}")
