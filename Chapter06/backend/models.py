from typing import List

from pydantic import BaseModel, Field


class UserBase(BaseModel):
    id: str = Field(...)
    username: str = Field(..., min_length=3, max_length=15)
    password: str = Field(...)


class UserIn(BaseModel):
    username: str = Field(..., min_length=3, max_length=15)
    password: str = Field(...)


class UserOut(BaseModel):
    id: str = Field(...)
    username: str = Field(..., min_length=3, max_length=15)


class UsersList(BaseModel):
    users: List[UserOut]
