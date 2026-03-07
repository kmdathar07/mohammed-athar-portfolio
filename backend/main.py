"""
backend/main.py — FastAPI Contact Form Backend
Run: uvicorn main:app --reload --port 5000
"""

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, validator
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from datetime import datetime

app = FastAPI(
    title="MAK Portfolio API",
    description="Backend API for Mohammed Athar K's portfolio contact form",
    version="1.0.0"
)

# ── CORS ──────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "https://your-portfolio.vercel.app",   # ← Update with your Vercel URL
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


# ── Models ────────────────────────────────────────────────────────────────────
class ContactMessage(BaseModel):
    name: str
    email: str
    subject: str = "Portfolio Contact"
    message: str

    @validator("name")
    def name_must_be_valid(cls, v):
        v = v.strip()
        if len(v) < 2:
            raise ValueError("Name must be at least 2 characters")
        if len(v) > 100:
            raise ValueError("Name too long")
        return v

    @validator("message")
    def message_must_be_valid(cls, v):
        v = v.strip()
        if len(v) < 10:
            raise ValueError("Message must be at least 10 characters")
        if len(v) > 3000:
            raise ValueError("Message too long (max 3000 characters)")
        return v

    @validator("email")
    def email_must_be_valid(cls, v):
        v = v.strip().lower()
        if "@" not in v or "." not in v:
            raise ValueError("Invalid email address")
        return v


class ContactResponse(BaseModel):
    success: bool
    message: str
    timestamp: str


# ── Email Config ──────────────────────────────────────────────────────────────
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")           # ← Your Gmail
SMTP_PASS = os.getenv("SMTP_PASS", "")           # ← Gmail App Password
OWNER_EMAIL = os.getenv("OWNER_EMAIL", "mohammedathar@example.com")


def send_email(contact: ContactMessage) -> bool:
    """Send notification email to portfolio owner."""
    if not SMTP_USER or not SMTP_PASS:
        # Dev mode: just log
        print(f"\n📧 New Contact Message:")
        print(f"   From: {contact.name} <{contact.email}>")
        print(f"   Subject: {contact.subject}")
        print(f"   Message: {contact.message[:100]}...\n")
        return True

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"[Portfolio] {contact.subject} — from {contact.name}"
        msg["From"] = SMTP_USER
        msg["To"] = OWNER_EMAIL
        msg["Reply-To"] = contact.email

        html_body = f"""
        <html>
        <body style="font-family: 'Outfit', Arial, sans-serif; background: #FAF7F2; padding: 30px;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; padding: 40px; box-shadow: 0 4px 40px rgba(0,0,0,0.06);">
            <div style="margin-bottom: 24px;">
              <div style="width: 40px; height: 4px; background: #E8654A; border-radius: 4px; margin-bottom: 16px;"></div>
              <h2 style="color: #1A1A2E; margin: 0; font-size: 22px;">New Portfolio Message</h2>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr><td style="padding: 8px 0; color: #8B9BAA; font-size: 12px; width: 90px;">FROM</td>
                  <td style="padding: 8px 0; color: #1A1A2E; font-weight: 600;">{contact.name}</td></tr>
              <tr><td style="padding: 8px 0; color: #8B9BAA; font-size: 12px;">EMAIL</td>
                  <td style="padding: 8px 0;"><a href="mailto:{contact.email}" style="color: #E8654A;">{contact.email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #8B9BAA; font-size: 12px;">SUBJECT</td>
                  <td style="padding: 8px 0; color: #1A1A2E;">{contact.subject}</td></tr>
              <tr><td style="padding: 8px 0; color: #8B9BAA; font-size: 12px;">TIME</td>
                  <td style="padding: 8px 0; color: #1A1A2E; font-size: 13px;">{datetime.now().strftime('%d %b %Y, %I:%M %p')}</td></tr>
            </table>
            <div style="background: #FAF7F2; border-radius: 14px; padding: 20px; margin-bottom: 24px;">
              <div style="color: #8B9BAA; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px;">MESSAGE</div>
              <p style="color: #1A1A2E; line-height: 1.7; margin: 0;">{contact.message}</p>
            </div>
            <a href="mailto:{contact.email}?subject=Re: {contact.subject}" 
               style="display: inline-block; background: #E8654A; color: white; padding: 12px 28px; border-radius: 100px; text-decoration: none; font-weight: 600; font-size: 14px;">
              Reply to {contact.name.split()[0]}
            </a>
          </div>
        </body>
        </html>
        """

        msg.attach(MIMEText(html_body, "html"))

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.ehlo()
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(SMTP_USER, OWNER_EMAIL, msg.as_string())

        return True
    except Exception as e:
        print(f"Email error: {e}")
        return False


# ── Routes ────────────────────────────────────────────────────────────────────
@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "MAK Portfolio API", "time": datetime.now().isoformat()}


@app.post("/api/contact", response_model=ContactResponse)
async def submit_contact(contact: ContactMessage):
    """Handle contact form submission."""
    success = send_email(contact)

    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send message. Please try emailing directly."
        )

    return ContactResponse(
        success=True,
        message="Your message has been sent! I'll get back to you soon.",
        timestamp=datetime.now().isoformat()
    )


@app.get("/")
def root():
    return {
        "message": "MAK Portfolio API",
        "docs": "/docs",
        "health": "/api/health"
    }
