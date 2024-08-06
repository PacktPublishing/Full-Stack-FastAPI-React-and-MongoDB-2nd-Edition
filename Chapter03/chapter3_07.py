from typing import Literal

from pydantic import BaseModel


class UserModel(BaseModel):
    id: int
    username: str
    email: str
    account: Literal["personal", "business"] | None = None
    nickname: str | None = None


print(UserModel.model_fields)
