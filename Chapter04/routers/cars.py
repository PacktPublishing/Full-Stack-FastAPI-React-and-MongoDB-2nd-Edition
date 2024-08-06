from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def get_cars():
    return {"message": "All cars here"}
