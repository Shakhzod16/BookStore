from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import Base, engine
from app.routers import admin, download, orders, payments

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="LearnBooks API",
    description="Backend API for LearnBooks single book store",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(orders.router)
app.include_router(admin.router)
app.include_router(download.router)
app.include_router(payments.router)


@app.get("/")
def root():
    return {"message": "LearnBooks API is running", "version": "1.0.0"}


@app.get("/health")
def health():
    return {"status": "ok"}
