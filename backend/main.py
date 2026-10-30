import cv2
import numpy as np
from fastapi import FastAPI, UploadFile, HTTPException, Response

import transforms

app = FastAPI()

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