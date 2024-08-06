from typing import Literal

from pydantic import BaseModel, Field


class UserModelFields(BaseModel):
    id: int = Field(alias="user_id")
    username: str = Field(alias="name")
    email: str = Field()
    account: Literal["personal", "business"] | None = Field(
        default=None, alias="account_type"
    )
    nickname: str | None = Field(default=None, alias="nick")


external_api_data = {
    "user_id": 234,
    "name": "Marko",
    "email": "email@gmail.com",
    "account_type": "personal",
    "nick": "freethrow",
}

user = UserModelFields.model_validate(external_api_data)
