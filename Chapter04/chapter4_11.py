from typing import Annotated

from fastapi import FastAPI, Header

app = FastAPI()


@app.get("/headers")
async def read_headers(user_agent: Annotated[str | None, Header()] = None):
    return {"User-Agent": user_agent}
