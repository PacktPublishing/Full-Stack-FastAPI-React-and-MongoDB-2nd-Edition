from contextlib import asynccontextmanager

from fastapi import FastAPI

from database import init_db
from routers import cars as cars_router
from routers import user as user_router

from fastapi_cors import CORS


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(lifespan=lifespan)

CORS(app)


# add CORS middleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


app.include_router(cars_router.router, prefix="/cars", tags=["Cars"])
app.include_router(user_router.router, prefix="/users", tags=["Users"])


@app.get("/", tags=["Root"])
async def read_root() -> dict:
    return {"message": "Welcome to your beanie powered app!"}
