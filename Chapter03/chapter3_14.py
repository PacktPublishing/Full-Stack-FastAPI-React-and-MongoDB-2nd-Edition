from pydantic import BaseModel, field_validator


class Article(BaseModel):
    id: int
    title: str
    content: str
    published: bool

    @field_validator("title")
    def check_title(cls, v: str) -> str:
        if "FARM stack" not in v:
            raise ValueError('Title must contain "FARM stack"')
        return v.title()
