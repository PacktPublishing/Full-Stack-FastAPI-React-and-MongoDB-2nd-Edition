from random import randint

from fastapi import FastAPI, Request

app = FastAPI()


@app.middleware("http")
async def add_random_header(request: Request, call_next):
    number = randint(1, 10)
    response = await call_next(request)

    response.headers["X-Random-Integer "] = str(number)
    return response


@app.get("/")
async def root():
    return {"message": "Hello World"}
