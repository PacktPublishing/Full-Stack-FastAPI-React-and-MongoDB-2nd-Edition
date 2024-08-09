import json
import uuid


from fastapi import APIRouter, Body, Depends, HTTPException, Request
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from authentication import AuthHandler
from models import UserBase, UserIn, UserOut, UsersList

router = APIRouter()

# instantiate the Auth Handler
auth_handler = AuthHandler()

# register user
# validate the data and create a user if the username and the email are valid and available


@router.post("/register", response_description="Register user")
async def register(request: Request, newUser: UserIn = Body(...)) -> UserBase:
    users = json.loads(open("users.json").read())["users"]

    # check if users listhas a user with the same username
    if any(user["username"] == newUser.username for user in users):
        raise HTTPException(status_code=409, detail="Username already taken")

    # hash the password before inserting it into MongoDB
    newUser.password = auth_handler.get_password_hash(newUser.password)

    # add a uuid to the user
    newUser = jsonable_encoder(newUser)

    newUser["id"] = str(uuid.uuid4())

    # add the user to the users dictionary
    users.append(newUser)

    # write the updated users dictionary to the JSON file
    with open("users.json", "w") as f:
        json.dump({"users": users}, f, indent=4)

    return newUser


# post user
@router.post("/login", response_description="Login user")
async def login(request: Request, loginUser: UserIn = Body(...)) -> str:
    users = json.loads(open("users.json").read())["users"]

    # find the user by username in the list of dicts
    user = next(
        (user for user in users if user["username"] == loginUser.username), None
    )

    # check password
    if (user is None) or (
        not auth_handler.verify_password(loginUser.password, user["password"])
    ):
        raise HTTPException(status_code=401, detail="Invalid username and/or password")

    token = auth_handler.encode_token(str(user["id"]), user["username"])

    response = JSONResponse(content={"token": token})

    return response


# me route
@router.get("/me", response_description="Logged in user data", response_model=UserOut)
async def me(request: Request, user_data=Depends(auth_handler.auth_wrapper)):
    users = json.loads(open("users.json").read())["users"]

    # find the user by username in the list of dicts
    currentUser = next(
        (user for user in users if user["username"] == user_data["username"]), None
    )

    return currentUser


# route for listing all users, needs auth
@router.get("/list", response_description="List all users")
async def list_users(request: Request, user_data=Depends(auth_handler.auth_wrapper)):
    users = json.loads(open("users.json").read())["users"]

    return UsersList(users=users)
