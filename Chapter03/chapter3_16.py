from typing import List
from pydantic import BaseModel

car_data = {
    "brand": "Ford",
    "models": [
        {"model": "Mustang", "year": 1964},
        {"model": "Focus", "year": 1975},
        {"model": "Explorer", "year": 1999},
    ],
    "country": "USA",
}


class CarModel(BaseModel):
    model: str
    year: int


class CarBrand(BaseModel):
    brand: str
    models: List[CarModel]
    country: str
