import cv2
from matplotlib import pyplot as plt

def grayscale(img):
    return cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

def binary_filer(gray_image):
    gray_image = cv2.medianBlur(gray_image, 5)

    ret,th1 = cv2.threshold(gray_image,127,255,cv2.THRESH_BINARY)
    th2 = cv2.adaptiveThreshold(gray_image, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY,11,2)
    th3 = cv2.adaptiveThreshold(gray_image, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY,11,2)
    otsu_t, th4 = cv2.threshold(gray_image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    return [
        (gray_image, "Original (grayscale)"),
        (th1, "Global Threshold (127)"),
        (th2, "Adaptive mean"),
        (th3, "Adaptive Gaussian"),
        (th4, f"Otsu ({otsu_t:.0f})"),
    ]

def show_results(results, filename):
    rows, cols = 2, 3
    plt.figure(figsize=(4 * cols, 4 * rows))
    for i, (image, title) in enumerate(results):
        plt.subplot(rows, cols, i + 1)
        plt.imshow(image, cmap="gray")
        plt.title(title)
        plt.xticks([]), plt.yticks([])
    plt.tight_layout()
    plt.savefig(filename, dpi=150, bbox_inches="tight")
    plt.show()

def main():
    img = cv2.imread("./images/sudoku.png")
    assert img is not None, "Could not read the image"

    gray_img = grayscale(img)
    results = binary_filer(gray_img)
    results.insert(0, (cv2.cvtColor(img, cv2.COLOR_BGR2RGB), "Original"))
    show_results(results, "results/binary.results.sudoku.png")

if __name__ == "__main__":
    main()