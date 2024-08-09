from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.users import router as users_router

# define origins
origins = ["*"]

app = FastAPI()

# add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# include the routers
app.include_router(users_router, prefix="/users", tags=["users"])
