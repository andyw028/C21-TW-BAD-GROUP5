import pytesseract
from PIL import Image, ImageFilter
import re
from datetime import date


def find_Amount(para):
    amounts = re.findall(r'\d{1,3}\.\d{1,2}\b', para)
    floats = [float(amount) for amount in amounts]
    unique = list(dict.fromkeys(floats))
    if len(unique) < 1:
        return "Unrecognisable"
    else:
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
    para_pattern = '(?:\w{3,}\n|\w+\s\w*)'
    Names = re.findall(para_pattern, para)
    Names_list = []
    if len(Names) < 5:
        for i in len(Names):
            Names_list.append(Names[i])
    else:
        for i in range(4):
            Names_list.append(Names[i])
    name = max(Names_list,key=len)
    return name

def read_IMG(img_path,type):

    img = Image.open(img_path)
    ## Turn into grey
    img.convert('RGB').save(img_path, "JPEG")
    img = img.convert("L")
    ## Apply filter
    img = img.filter(ImageFilter.SHARPEN)
    img = img.filter(ImageFilter.MinFilter)
    para = pytesseract.image_to_string(img, lang=f'{type}')
    return(para)
