from fastapi import FastAPI

from src.core.config import settings
from src.db.base import Base
from src.db.session import engine

from src.api.routes import propiedad
from src.api.routes import media
from src.api.routes import catalogos
from src.api.routes import auth
from src.api.routes import usuario
from src.api.routes import empleado
from src.api.routes import empleadoYUsuario

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION
)


Base.metadata.create_all(bind=engine)
print(Base.metadata.tables.keys())

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(propiedad.router)
app.include_router(media.router)
app.include_router(catalogos.router)
app.include_router(auth.router)
app.include_router(usuario.router)
app.include_router(empleado.router)
app.include_router(empleadoYUsuario.router)

@app.get("/")
def root():
    return {
        "mensaje": "API funcionando"
    }

from pwdlib import PasswordHash

# Configura el gestor recomendado (Bcrypt)
password_hash = PasswordHash.recommended()

# Genera el hash para la contraseña "123456"
password_plana = "123456"
hash_resultado = password_hash.hash(password_plana)

print(f"Contraseña: {password_plana}")
print(f"Hash generado: {hash_resultado}")
