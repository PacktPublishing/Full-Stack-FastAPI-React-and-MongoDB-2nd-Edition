from fastapi import FastAPI
from pydantic import BaseModel


class InsertCar(BaseModel):
    brand: str
    model: str
    year: int


app = FastAPI()


@app.post("/cars")
async def new_car(data: InsertCar):
    print(data)
    return {"message": data}
