from fastapi import FastAPI

from routers.cars import router as cars_router
from routers.user import router as users_router

app = FastAPI()

app.include_router(cars_router, prefix="/cars", tags=["cars"])
app.include_router(users_router, prefix="/users", tags=["users"])
