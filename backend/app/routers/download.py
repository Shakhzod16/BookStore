from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from app.config import settings
from app.database import get_db
from app.models import Order, OrderStatus

router = APIRouter(prefix="/api/download", tags=["download"])


@router.get("/{token}")
def download_book(token: str, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.download_token == token).first()
    if not order:
        raise HTTPException(status_code=404, detail="Invalid download link")
    if order.status not in (OrderStatus.paid, OrderStatus.delivered):
        raise HTTPException(status_code=403, detail="Payment not confirmed")
    return RedirectResponse(url=settings.BOOK_FILE_URL)
