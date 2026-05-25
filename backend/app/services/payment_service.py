def confirm_demo_payment(order_id: str) -> bool:
    return True


def verify_stripe_webhook(payload: bytes, sig_header: str) -> dict:
    return {}
