import cv2

def flip_horizontal(img):
    return img[:, ::-1]

def flip_vertical(img):
    return img[::-1, :]

def rotate_right(img):
    transposed = img.transpose(1, 0, 2)
    return flip_horizontal(transposed)

def rotate_left(img):
    transposed = img.transpose(1, 0, 2)
    return flip_vertical(transposed)

RESIZING_METHODS = {
    "nearest": cv2.INTER_NEAREST,
    "bilinear": cv2.INTER_LINEAR,
    "bicubic": cv2.INTER_CUBIC,
    "area": cv2.INTER_AREA,
}

def resize(img, width, height, interpolation="bilinear"):
    return cv2.resize(img, (width, height), interpolation=RESIZING_METHODS[interpolation])