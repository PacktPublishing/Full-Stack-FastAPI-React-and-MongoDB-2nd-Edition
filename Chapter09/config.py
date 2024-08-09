from typing import Optional

from pydantic_settings import BaseSettings, SettingsConfigDict


class BaseConfig(BaseSettings):
    DB_URL: Optional[str]

    CLOUDINARY_SECRET_KEY: Optional[str]
    CLOUDINARY_API_KEY: Optional[str]
    CLOUDINARY_CLOUD_NAME: Optional[str]

    OPENAI_API_KEY: Optional[str]
    RESEND_API_KEY: Optional[str]

    """Loads the dotenv file. Including this is necessary to get
    pydantic to load a .env file."""
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")
