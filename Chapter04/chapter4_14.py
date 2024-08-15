from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel

app = FastAPI()


class InsertCar(BaseModel):
    brand: str
    model: str
    year: int


@app.post("/carsmodel")
async def new_car_model(car: InsertCar):
    if car.year > 2022:
        raise HTTPException(
            status.HTTP_406_NOT_ACCEPTABLE, detail="The car doesn’t exist yet!"
        )
    return {"message": car}
