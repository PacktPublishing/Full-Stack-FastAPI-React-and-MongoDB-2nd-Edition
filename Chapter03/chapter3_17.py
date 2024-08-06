from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    api_url: str = Field(default="")
    secret_key: str = Field(default="")

    class Config:
        env_file = ".env"


print(Settings().model_dump())
