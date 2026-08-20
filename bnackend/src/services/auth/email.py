import smtplib

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from src.core.config import settings


# ===================================================
# ENVIAR EMAIL
# ===================================================

def send_email(

    destinatario: str,

    asunto: str,

    cuerpo: str

):

    mensaje = MIMEMultipart()

    mensaje["From"] = settings.SMTP_FROM

    mensaje["To"] = destinatario

    mensaje["Subject"] = asunto

    mensaje.attach(
        MIMEText(
            cuerpo,
            "plain",
            "utf-8"
        )
    )

    servidor = smtplib.SMTP(
        settings.SMTP_HOST,
        settings.SMTP_PORT
    )

    servidor.starttls()

    servidor.login(
        settings.SMTP_USER,
        settings.SMTP_PASSWORD
    )

    servidor.sendmail(
        settings.SMTP_FROM,
        destinatario,
        mensaje.as_string()
    )

    servidor.quit()


# ===================================================
# LOGIN
# ===================================================

def send_login_code(

    destinatario: str,

    codigo: str

):

    cuerpo = f"""
Hola.

Tu código de verificación es:

{codigo}

Este código vence en {settings.OTP_EXPIRE_MINUTES} minutos.

Si no solicitaste este acceso, ignorá este correo.
"""

    send_email(

        destinatario,

        "Código de verificación",

        cuerpo

    )


# ===================================================
# RECUPERAR CONTRASEÑA
# ===================================================

def send_reset_password(

    destinatario: str,

    enlace: str

):

    cuerpo = f"""
Recibimos una solicitud para restablecer tu contraseña.

Podés hacerlo desde el siguiente enlace:

{enlace}

Si no fuiste vos, ignorá este correo.
"""

    send_email(

        destinatario,

        "Restablecer contraseña",

        cuerpo

    )


# ===================================================
# BIENVENIDA
# ===================================================

def send_welcome_email(

    destinatario: str,

    nombre: str

):

    cuerpo = f"""
Hola {nombre}.

Tu cuenta fue creada correctamente.

Ya podés iniciar sesión.

Saludos.
"""

    send_email(

        destinatario,

        "Bienvenido",

        cuerpo

    )