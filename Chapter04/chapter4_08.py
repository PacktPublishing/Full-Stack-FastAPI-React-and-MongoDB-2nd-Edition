from fastapi import Body, FastAPI
from pydantic import BaseModel


class InsertCar(BaseModel):
    brand: str
    model: str
    year: int


class UserModel(BaseModel):
    username: str
    name: str


app = FastAPI()


@app.post("/car/user")
async def new_car_model(car: InsertCar, user: UserModel, code: int = Body(None)):
    return {"car": car, "user": user, "code": code}
