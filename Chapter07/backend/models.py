from typing import Annotated, List, Optional

from pydantic import BaseModel, BeforeValidator, ConfigDict, Field, field_validator

# Represents an ObjectId field in the database.
# It will be represented as a string in the model so that it can be serialized to JSON.

PyObjectId = Annotated[str, BeforeValidator(str)]


class CarModel(BaseModel):
    """
    Container for a single car document in the database
    """

    # The primary key for the CarModel, stored as a `str` on the instance.
    # This will be aliased to `_id` when sent to MongoDB,
    # but provided as `id` in the API requests and responses

    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    brand: str = Field(...)
    make: str = Field(...)
    year: int = Field(..., gt=1970, lt=2025)
    cm3: int = Field(..., gt=0, lt=5000)
    km: int = Field(..., gt=0, lt=500 * 1000)
    price: int = Field(..., gt=0, lt=100000)
    user_id: str = Field(...)

    # add the picture file
    picture_url: Optional[str] = Field(None)

    @field_validator("brand")
    @classmethod
    def check_brand_case(cls, v: str) -> str:
        return v.title()

    @field_validator("make")
    @classmethod
    def check_make_case(cls, v: str) -> str:
        return v.title()

    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "brand": "Ford",
                "make": "Fiesta",
                "year": 2019,
                "cm3": 1500,
                "km": 120000,
                "price": 10000,
                "picture_url": "https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            }
        },
    )


class UpdateCarModel(BaseModel):
    """
    Optional updates
    """

    # The primary key for the CarModel, stored as a `str` on the instance.
    # This will be aliased to `_id` when sent to MongoDB,
    # but provided as `id` in the API requests and responses

    brand: Optional[str] = None
    make: Optional[str] = None
    year: Optional[int] = Field(gt=1970, lt=2025, default=None)
    cm3: Optional[int] = Field(gt=0, lt=5000, default=None)
    km: Optional[int] = Field(gt=0, lt=500 * 1000, default=None)
    price: Optional[int] = Field(gt=0, lt=100 * 1000, default=None)

    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "brand": "Ford",
                "make": "Fiesta",
                "year": 2019,
                "cm3": 1500,
                "km": 120000,
                "price": 10000,
            }
        },
    )


class CarCollection(BaseModel):
    """
    A container holding a list of cars
    """

    cars: List[CarModel]


class CarCollectionPagination(CarCollection):
    page: int = Field(ge=1, default=1)
    has_more: bool


######################### USER MODELS ###################################


class UserModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    username: str = Field(..., min_length=3, max_length=15)
    password: str = Field(...)


class LoginModel(BaseModel):
    username: str = Field(...)
    password: str = Field(...)


class CurrentUserModel(BaseModel):
    id: PyObjectId = Field(alias="_id", default=None)
    username: str = Field(..., min_length=3, max_length=15)
