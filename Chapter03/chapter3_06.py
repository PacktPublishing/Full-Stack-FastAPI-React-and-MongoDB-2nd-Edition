from pydantic import BaseModel


class User(BaseModel):
    id: int
    username: str
    email: str
    password: str


user = User.model_validate(
    {
        "id": 1,
        "username": "freethrow",
        "email": "email@gmail.com",
        "password": "somesecret",
    }
)

print(user)
