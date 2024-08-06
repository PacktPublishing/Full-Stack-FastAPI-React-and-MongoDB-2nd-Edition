from typing import Dict

from fastapi import Body, FastAPI

app = FastAPI()


@app.post("/cars")
async def new_car(data: Dict = Body(...)):
    print(data)
    return {"message": data}
