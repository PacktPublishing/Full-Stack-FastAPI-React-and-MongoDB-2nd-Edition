from pydantic import BaseModel, EmailStr, Field


class UserModel(BaseModel):
    id: int = Field()
    username: str = Field(min_length=5, max_length=20)
    email: EmailStr = Field()
    password: str = Field(min_length=5, max_length=20, pattern="^[a-zA-Z0-9]+$")


u = UserModel(
    id=1,
    username="freethrow",
    email="email@gmail.com",
    password="password123",
)

print(u.model_dump())

print(u.model_dump_json(exclude=set("password")))
