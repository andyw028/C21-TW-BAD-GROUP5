import pytesseract
import os
import numpy as np
import cv2
from PIL import Image, ImageFilter
from matplotlib import pyplot as plt
import re


pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def main(img):
    img_path = os.path.join('./data/',img + '.jpeg')
    print(img_path)
    img = Image.open(img_path)
    img = img.filter(ImageFilter.DETAIL)
    img.show()
    # img.thumbnail((800,800), Image.ANTIALIAS)
    # custom_oem_psm_config = r'--psm 11' 
    para = pytesseract.image_to_string(img, lang="chi_tra+eng")
    return para
    # para.split("\n")
    # print(para)
    # print(amount)
    # para_list = []
    # para_list.append(para.split("\n"))
    # print(para_list)
    # x = re.findall("\d", para)
    # print(x)
    # amount_list = list(filter(amount.match, para_list))
    # print(amount_list)

def find_Amount(para):
    amounts = re.findall(r'\d+\.\d{1,2}\b', para)
    floats = [float(amount) for amount in amounts]
    # filter the duplicated amount
    unique = list(dict.fromkeys(floats))
    print(unique)
    print(max(unique))

def find_Date(para):
    date_pattern_1 = r"[\d]{1,2}/[\d]{1,2}/[\d]{4}"
    date_pattern_2 = r"[\d]{1,2}-[\d]{1,2}-[\d]{4}"
    Dates = re.findall('([\d]{1,2}/[\d]{1,2}/[\d]{4}|[\d]{1,2}-[\d]{1,2}-[\d]{4})' , para)
    print(Dates)

def find_Name(para):
    print("123")





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

#find_Amount(main("1113"))

# main("1188")

return_text = main("12345")
print(return_text)

find_Amount(return_text)

find_Date(return_text)
