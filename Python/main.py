import pytesseract
import os
import cv2
from PIL import Image, ImageFilter
from matplotlib import pyplot as plt
import re
from datetime import date


def find_Amount(para):
    amounts = re.findall(r'\d{1,3}\.\d{1,2}\b', para)
    floats = [float(amount) for amount in amounts]
    unique = list(dict.fromkeys(floats))
    return max(unique)

def find_Date(para):
    date_pattern_1 = r"[\d]{1,4}/[\d]{1,2}/[\d]{1,2}"
    date_pattern_2 = r"[\d]{1,4}-[\d]{1,4}-[\d]{1,4}"
    Dates = re.findall('([\d]{1,4}/[\d]{1,4}/[\d]{1,4}|[\d]{1,4}-[\d]{1,4}-[\d]{1,4})' , para)
    today = date.today()

    # dd/mm/YY
    today_date = today.strftime("%Y/%m/%d")
    if len(Dates) < 1:
        return today_date
    else:
        return Dates[0]

    

def find_Name(para):
    shop_name_pattern = '\w+'
    Names = re.findall(shop_name_pattern, para)
    Names_list = []
    if len(Names) < 7:
        for i in len(Names):
            Names_list.append(Names[i])
    else:
        for i in range(5):
            Names_list.append(Names[i])
    
    name = max(Names_list,key=Names_list.count)
    return name


def read_img_cv(img):
    img_path = os.path.join('./data/',img + '.jpeg')
    print(img_path)
    img_cv = cv2.imread(img_path)
    ## img is np array with BGR
    ## change to RGB for pytesseract
    plt.subplot(121)
    plt.imshow(img_cv)

    dst = cv2.fastNlMeansDenoisingColored(img_cv,None,10,10,7,21)
    plt.subplot(122)
    plt.imshow(dst)
    img_rgb = cv2.cvtColor(dst, cv2.COLOR_BGR2RGB)


def read_IMG(img_path,type):

    img = Image.open(img_path)
    # img = img.resize((500,500),Image.LANCZOS)
    ## Turn into grey
    img = img.convert("L")
    ## Apply filter
    img = img.filter(ImageFilter.SHARPEN)
    img = img.filter(ImageFilter.MinFilter)
    para = pytesseract.image_to_string(img, lang=f'{type}')
    print("para",para)
    return(para)
