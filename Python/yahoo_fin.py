from yahoo_fin import stock_info as si
from sanic import Sanic
from sanic.response import json

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


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
