import secrets
import string
from datetime import datetime, timedelta

from jose import JWTError, jwt

from app.config import settings


def generate_order_id() -> str:
    chars = string.ascii_uppercase + string.digits
    random_part = "".join(secrets.choice(chars) for _ in range(9))
    return f"ORD-{random_part}"


def generate_download_token() -> str:
    return secrets.token_urlsafe(32)


def create_admin_token() -> str:
    expire = datetime.utcnow() + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    data = {"sub": settings.ADMIN_EMAIL, "exp": expire}
    return jwt.encode(data, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def verify_admin_token(token: str) -> bool:
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        return payload.get("sub") == settings.ADMIN_EMAIL
    except JWTError:
        return False
