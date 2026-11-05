import cv2
import numpy as np

def binary(img, threshold=127):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    result = np.where(gray > threshold, 255, 0).astype(np.uint8)
    return cv2.cvtColor(result, cv2.COLOR_GRAY2BGR)