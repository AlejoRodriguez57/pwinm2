from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    # -------------------------
    # Proyecto
    # -------------------------

    PROJECT_NAME: str = "FastAPI-Inmobiliaria"
    PROJECT_VERSION: str = "1.0.0"

    # -------------------------
    # Base de datos
    # -------------------------

    DATABASE_URL: str

    # -------------------------
    # JWT
    # -------------------------

    SECRET_KEY: str
    ALGORITHM: str = "HS256"

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 30

    # -------------------------
    # Email
    # -------------------------

    SMTP_HOST: str
    SMTP_PORT: int

    SMTP_USER: str
    SMTP_PASSWORD: str

    SMTP_FROM: str

    # -------------------------
    # OTP
    # -------------------------

    OTP_EXPIRE_MINUTES: int = 5
    OTP_MAX_ATTEMPTS: int = 5

    # -------------------------
    # Archivos
    # -------------------------

    UPLOAD_FOLDER: str = "uploads"

    model_config = SettingsConfigDict(
        env_file=".env.local"
    )


settings = Settings()