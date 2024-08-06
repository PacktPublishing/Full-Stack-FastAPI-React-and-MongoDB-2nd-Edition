from datetime import datetime

from pydantic import BaseModel, ValidationError


class User(BaseModel):
    id: int
    username: str
    email: str
    dob: datetime


Pu = User(
    id=1, username="freethrow", email="email@gmail.com", dob=datetime(1975, 5, 13)
)


try:
    u = User(
        id="one",
        username="freethrow",
        email="email@gmail.com",
        dob=datetime(1975, 5, 13),
    )
    print(u)


except ValidationError as e:
    print(e)
