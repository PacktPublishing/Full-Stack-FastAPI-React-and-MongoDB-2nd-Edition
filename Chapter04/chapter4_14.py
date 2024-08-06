from fastapi import FastAPI, status

app = FastAPI()


@app.get("/", status_code=status.HTTP_208_ALREADY_REPORTED)
async def raw_fa_response():
    return {"message": "fastapi response"}
