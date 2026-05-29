import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from app.config import settings


def send_download_email(
    customer_name: str,
    customer_email: str,
    order_id: str,
    download_token: str,
) -> bool:
    download_url = f"{settings.FRONTEND_URL}/download/{download_token}"

    html_content = f"""
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #4f46e5; padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0;">LearnBooks</h1>
            <p style="color: #c7d2fe; margin: 8px 0 0;">Your order is confirmed!</p>
        </div>

        <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb;">
            <h2 style="color: #111827;">Hi {customer_name}!</h2>
            <p style="color: #6b7280;">
                Thank you for your purchase. Your book is ready to download.
            </p>

            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #374151;">
                    <strong>Order ID:</strong> {order_id}
                </p>
                <p style="margin: 8px 0 0; color: #374151;">
                    <strong>Book:</strong> {settings.BOOK_TITLE}
                </p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
                <a href="{download_url}"
                   style="background: #4f46e5; color: white; padding: 16px 32px;
                          border-radius: 8px; text-decoration: none; font-size: 18px;
                          font-weight: bold; display: inline-block;">
                    Download Your Book (PDF)
                </a>
            </div>

            <p style="color: #9ca3af; font-size: 14px;">
                This link is unique to your order. Do not share it.
                If you have any issues, contact support@learnbooks.com
            </p>
        </div>

        <div style="background: #f9fafb; padding: 20px; border-radius: 0 0 12px 12px;
                    text-align: center; border: 1px solid #e5e7eb; border-top: none;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                © 2025 LearnBooks. All rights reserved.
            </p>
        </div>
    </body>
    </html>
    """

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"Your LearnBooks Order — Download Ready! ({order_id})"
        msg["From"] = settings.EMAIL_FROM
        msg["To"] = customer_email
        msg.attach(MIMEText(html_content, "html"))

        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.sendmail(settings.EMAIL_FROM, customer_email, msg.as_string())
        return True
    except Exception as e:
        print(f"Email error: {e}")
        return False
