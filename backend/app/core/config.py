from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "SMIM - Sistema de Monitoramento de Inflação de Morrinhos"
    APP_VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # CORS
    BACKEND_CORS_ORIGINS: list[str] = ["*"]

    class Config:
        env_file = ".env"

settings = Settings()
