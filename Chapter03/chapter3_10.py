from datetime import datetime
from uuid import uuid4

from pydantic import BaseModel, Field


class ChessTournament(BaseModel):
    id: int = Field(strict=True)
    dt: datetime = Field(default_factory=datetime.now)
    name: str = Field(min_length=10, max_length=30)
    num_players: int = Field(ge=4, le=16, multiple_of=2)
    code: str = Field(default_factory=uuid4)
