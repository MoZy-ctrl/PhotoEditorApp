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