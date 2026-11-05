import cv2
import numpy as np

def binary(img, threshold=127):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    result = np.where(gray > threshold, 255, 0).astype(np.uint8)
    return cv2.cvtColor(result, cv2.COLOR_GRAY2BGR)

def gaussian(img):
    return cv2.GaussianBlur(img, (9, 9), 0)

def sobel(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gx = cv2.Sobel(gray, cv2.CV_64F, 1, 0)
    gy = cv2.Sobel(gray, cv2.CV_64F, 0, 1)
    mag = cv2.magnitude(gx, gy)
    result = cv2.convertScaleAbs(mag)
    return cv2.cvtColor(result, cv2.COLOR_GRAY2BGR)