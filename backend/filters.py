import cv2
import numpy as np

def _graycolor(img: np.ndarray) -> np.ndarray:
    if img.ndim == 2:
        return img
    return cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

def gaussian_blur(img: np.ndarray) -> np.ndarray:
    return cv2.GaussianBlur(img, (5, 5), 0)

def sobel(img: np.ndarray) -> np.ndarray:
    gray = _graycolor(img)
    sobelx = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=5)
    sobely = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=5)
    magnitude = cv2.magnitude(sobelx, sobely)
    return cv2.normalize(magnitude, None, 0, 255, cv2.NORM_MINMAX).astype(np.uint8)

def binary_threshold(img: np.ndarray, thresh: int = 127) -> np.ndarray:
    gray = _graycolor(img)
    _, result = cv2.threshold(gray, thresh, 255, cv2.THRESH_BINARY)
    return result

def otsu_threshold(img: np.ndarray) -> np.ndarray:
    gray = _graycolor(img)
    _, result = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    return result

