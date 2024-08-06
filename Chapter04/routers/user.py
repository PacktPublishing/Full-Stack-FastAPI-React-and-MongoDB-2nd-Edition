from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def get_users():
    return {"message": "All users here"}
