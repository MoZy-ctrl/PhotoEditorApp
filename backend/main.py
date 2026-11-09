import cv2
import numpy as np
from fastapi import FastAPI, UploadFile, HTTPException, Response, Form

import transforms
import filters

app = FastAPI()

filter_ops = {
    "binary": filters.binary,
    "gaussian": filters.gaussian,
    "sobel": filters.sobel,
    "otsu": filters.otsu
}

operations = {
    "flip_horizontal": transforms.flip_horizontal,
    "flip_vertical": transforms.flip_vertical,
    "rotate_right": transforms.rotate_right,
    "rotate_left": transforms.rotate_left,
}

@app.get("/api/health")
def health():
    return {"status": "ok"}

@app.post("/api/transform/{operation}")
async def transform(operation: str, file: UploadFile):
    data = await file.read()
    arr = np.frombuffer(data, np.uint8)
    img = cv2.imdecode(arr, cv2.IMREAD_COLOR)
    func = operations.get(operation)
    if func is None:
        raise HTTPException(status_code=400, detail="Invalid operation")
    result = func(img)
    ok, buffer = cv2.imencode(".png", result)
    return Response(content=buffer.tobytes(), media_type="image/png")

@app.post("/api/filters/{name}")
async def apply_filter(name: str, file: UploadFile):
    data = await file.read()
    arr = np.frombuffer(data, np.uint8)
    img = cv2.imdecode(arr, cv2.IMREAD_COLOR)
    func = filter_ops.get(name)
    if func is None:
        raise HTTPException(status_code=400, detail="Invalid filter")
    result = func(img)
    ok, buffer = cv2.imencode(".png", result)
    return Response(content=buffer.tobytes(), media_type="image/png")

@app.post("/api/resize")
async def resize_image(
    file: UploadFile,
    width: int = Form(...),
    height: int = Form(...),
    interpolation: str = Form("bilinear")
):
    if not (1 <= width <= 10000 and 1 <= height <= 10000):
        raise HTTPException(status_code=400, detail="Width and height must be between 1 and 10000")
    if interpolation not in transforms.RESIZING_METHODS:
        raise HTTPException(status_code=400, detail="Invalid interpolation method")

    data = await file.read()
    img = cv2.imdecode(np.frombuffer(data, np.uint8), cv2.IMREAD_COLOR)
    if img is None:
        raise HTTPException(status_code=400, detail="Invalid image file")
    result = transforms.resize(img, width, height, interpolation)
    ok, buffer = cv2.imencode(".png", result)
    return Response(content=buffer.tobytes(), media_type="image/png")

@app.post("/api/crop")
async def crop_image(
    file: UploadFile,
    x: int = Form(...),
    y: int = Form(...),
    width: int = Form(...),
    height: int = Form(...)
):
    data = await file.read()
    img = cv2.imdecode(np.frombuffer(data, np.uint8), cv2.IMREAD_COLOR)
    if img is None:
        raise HTTPException(status_code=400, detail="Invalid image file")

    img_height, img_width = img.shape[:2]
    if x < 0 or y < 0 or width < 1 or height < 1 or x + width > img_width or y + height > img_height:
        raise HTTPException(status_code=400, detail="Crop dimensions are out of bounds")

    result = transforms.crop(img, x, y, width, height)
    ok, buffer = cv2.imencode(".png", result)
    return Response(content=buffer.tobytes(), media_type="image/png")