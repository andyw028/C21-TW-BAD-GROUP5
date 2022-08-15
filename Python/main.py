import pytesseract
import os
import cv2
from PIL import Image, ImageFilter
from matplotlib import pyplot as plt
import re
from datetime import date

today = date.today()

# dd/mm/YY
today_date = today.strftime("%Y/%m/%a")


# pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"


def find_Amount(para):
    amounts = re.findall(r'\d{1,3}\.\d{1,2}\b', para)
    floats = [float(amount) for amount in amounts]
    # filter the duplicated amount
    unique = list(dict.fromkeys(floats))
    #print(f'Money spent: HK${max(unique)}')
    return max(unique)

def find_Date(para):
    date_pattern_1 = r"[\d]{1,4}/[\d]{1,2}/[\d]{1,2}"
    date_pattern_2 = r"[\d]{1,4}-[\d]{1,4}-[\d]{1,4}"
    Dates = re.findall('([\d]{1,4}/[\d]{1,4}/[\d]{1,4}|[\d]{1,4}-[\d]{1,4}-[\d]{1,4})' , para)
    # Dates is list
    if len(Dates) < 1:
        return today_date
    else:
        return Dates[0]
    # if len(Dates) is 0:
    #  Dates = re.findall('[\d]{1,4}.[\d]{1,2}.[\d]{1,2}' , para)
    #  print(f'Dates: {Dates}')
    

def find_Name(para):
    shop_name_pattern = '\w+'
    Names = re.findall(shop_name_pattern, para)
    #print(Names)
    Names_list = []
    if len(Names) < 7:
        for i in len(Names):
            Names_list.append(Names[i])
    else:
        for i in range(5):
            Names_list.append(Names[i])
    
    # Find occur the most
    name = max(Names_list,key=Names_list.count)
    return name
    # print(f'This the name of the shop: {name}')


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
    #print(pytesseract.image_to_string(img_rgb, lang="chi_tra+eng"))

def read_IMG(img_path,type):
    # img_path = os.path.join('./data/',img + '.jpeg')
    img = Image.open(img_path)
    ## Turn into grey
    img = img.convert("L")
    ## Apply filter
    img = img.filter(ImageFilter.SHARPEN)
    img = img.filter(ImageFilter.MinFilter)
    # multiply each pixel by 1.2
    # img = img.point(lambda i: i * 1.2)
    # img.show()
    # custom_oem_psm_config = r'--psm 2' 
    para = pytesseract.image_to_string(img, lang=f'{type}')
    print(para)
    return(para)
