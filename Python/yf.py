from yahoo_fin import stock_info as si
import pandas as pd
from sanic import Sanic
from sanic.response import json
import os
from main import read_IMG, find_Amount, find_Date, find_Name

app = Sanic("Pocketmon")


@app.on_response
async def add_CORS(request, response):
    response.headers['Access-Control-Allow-Origin'] = "*"


@app.get("/stock/<ticker>")
def getStock(request, ticker):
    ticker_list = ticker.split('&')
    ticker_str = ', '.join(ticker_list)
    result = {}
    for i in ticker_list:
        name = i.upper()
        price = si.get_live_price(name)
        result[name] = price

    print(result)
    return json(result)


@app.get("/stockgainer")
def get_daily(request):
    gain = pd.DataFrame(si.get_day_gainers())
    gain = gain[['Symbol', 'Price (Intraday)', '% Change']]
    top_ten_gainer = gain[:5]
    top_ten_gainer = top_ten_gainer.to_dict('records')
    return json(top_ten_gainer)


@ app.get("/stockloser")
def get_daily(request):
    gain = pd.DataFrame(si.get_day_losers())
    gain = gain[['Symbol', 'Price (Intraday)', '% Change']]
    top_ten_gainer = gain[:5]
    g_json = top_ten_gainer.to_dict('records')
    return json(g_json)


@ app.get("/stockactive")
def get_daily(request):
    gain = pd.DataFrame(si.get_day_most_active())
    gain = gain[['Symbol', 'Price (Intraday)', '% Change']]
    top_ten_gainer = gain[:5]
    g_json = top_ten_gainer.to_dict('records')
    return json(g_json)


@app.post("/upload/<receipt:path>")
async def handler(request, receipt: str):
    lan_type = request.json["lanType"]
    receipt_path = receipt
    img_path = os.path.join('../uploads/', receipt_path)
    result = read_IMG(img_path, lan_type)
    predicted_amount = find_Amount(result)
    predicted_date = find_Date(result)
    predicted_name = find_Name(result)
    return json({"amount": predicted_amount, "date": predicted_date, "name": predicted_name})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
