from typing import Any, Self

from pydantic import BaseModel, EmailStr, model_validator, ValidationError


class UserModelV(BaseModel):
    id: int
    username: str
    email: EmailStr
    password1: str
    password2: str

    @model_validator(mode="after")
    def check_passwords_match(self) -> Self:
        pw1 = self.password1
        pw2 = self.password2
        if pw1 is not None and pw2 is not None and pw1 != pw2:
            raise ValueError("passwords do not match")
        return self

    @model_validator(mode="before")
    @classmethod
    def check_private_data(cls, data: Any) -> Any:
        if isinstance(data, dict):
            assert "private_data" not in data, "Private data should not be included"
        return data


usr_data = {
    "id": 1,
    "username": "freethrow",
    "email": "email@gmail.com",
    "password1": "password123",
    "password2": "password456",
    "private_data": "some private data",
}

try:
    user = UserModelV.model_validate(usr_data)
    print(user)
except ValidationError as e:
    print(e)
