from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./learnbooks.db"

    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    ADMIN_EMAIL: str = "admin@learnbooks.com"
    ADMIN_PASSWORD: str = "admin123"

    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    EMAIL_FROM: str = "LearnBooks <noreply@learnbooks.com>"

    BOOK_TITLE: str = "The Complete JavaScript & Web Development Guide"
    BOOK_PRICE: float = 29.99
    BOOK_FILE_URL: str = "https://example.com/book.pdf"

    FRONTEND_URL: str = "http://localhost:3000"

    STRIPE_SECRET_KEY: str = ""
    STRIPE_WEBHOOK_SECRET: str = ""

    model_config = SettingsConfigDict(env_file=".env")


settings = Settings()
