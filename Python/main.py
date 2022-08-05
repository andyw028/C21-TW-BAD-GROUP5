import pytesseract
import os
import numpy as np
import cv2
from PIL import Image
from matplotlib import pyplot as plt


pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def main(img):
    img_path = os.path.join('./data/',img + '.jpeg')
    print(img_path)
    img = Image.open(img_path)
    # img.thumbnail((800,800), Image.ANTIALIAS)
    print(pytesseract.image_to_string(img, lang="chi_tra"))


    
def read_img_cv(img):
    img_path = os.path.join('./data/',img + '-receipt.jpg')
    print(img_path)
    img_cv = cv2.imread(img_path)
    ## img is np array with BGR
    ## change to RGB for pytesseract
    plt.subplot(121),plt.imshow(img_cv)

    dst = cv2.fastNlMeansDenoisingColored(img_cv,None,10,10,7,21)
    plt.subplot(122),plt.imshow(dst)

    img_rgb = cv2.cvtColor(dst, cv2.COLOR_BGR2RGB)
    print(pytesseract.image_to_string(img_rgb, lang="chi_tra+eng"))


#  read_img_cv('1140')

main('123')
