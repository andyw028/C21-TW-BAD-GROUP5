let allStock
//load the mobile nav and the web nav when loaded
function eventListenerOfStockButton() {
	document.querySelector('#stock-btn').addEventListener('click', async () => {
		loadStockPage()
		await loadUserStocks()
	})
	document
		.querySelector('#m-stock-btn')
		.addEventListener('click', async () => {
			loadStockPage()
			await loadUserStocks()
		})
}
//load table column names
function loadStockPage() {
	//Loading the stock page into the panel
	const panel = document.querySelector('#dashboard-panel')
	//loading the table title plus buttons
	panel.innerHTML = `
	<div class="col-md-12 d-flex flex-row-reverse">
	<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal1">
<i class="bi bi-plus-square"></i>
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
<!-- FORM -->
<form id="stock-form">
  <div class="mb-3">
    <label for="" class="form-label">Ticker</label>
    <input name="ticker" class="form-control" id="ticker" aria-describedby="emailHelp" required>
    <div id="Ticker-Warn" class="form-text">Make Sure Your Ticker is Correct</div>
  </div>
  <div class="mb-3">
	<label for="buy-sell" class="form-label">Buy or Sell?</label>
	<select class="form-select" name="buy-sell" aria-label="Default select example" required>
  <option selected>Please Specify Buy or Sell</option>
  <option value="buy">Buy</option>
  <option value="sell">Sell</option>
</select>
  </div>
  <div class="mb-3">
    <label for="Price" class="form-label">Price</label>
    <input name="price" class="form-control" id="price" required>
  </div>
  <div class="mb-3">
    <label for="Amount" class="form-label">Amount</label>
    <input name="amount" class="form-control" id="amount" required>
  </div>
  <button type="class" class="btn btn-primary">Submit</button>
  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
</form>
      </div>
    </div>
  </div>
</div>

	<button id="stock-reload" class="btn btn-dark text-center">
	<i class="bi bi-arrow-clockwise"></i>
	</button>
	</div>
	<div id="stock-table-title" class="row mt-3">
	<div class="col-3 d-flex"><span>Ticker</span></div>
	<div class="col-3 d-flex"><span>Amount</span></div>
	<div class="col-3 d-flex"><span>Average</span></div>
	<div class="col-3 d-flex"><span>Current</span></div>
	</div>
	<div id="stocks-detail"></div>
	`
	document
		.querySelector('#stock-reload')
		.addEventListener('click', async () => {
			const curBtn = document.querySelector('#stock-reload')
			curBtn.disabled = true
			document.querySelector('#stocks-detail').innerHTML = ``
			console.log('reload')
			await loadUserStocks()
		})
	formSubmitForNewStock()
}

//load all stock and calculates
async function loadUserStocks() {
	console.log('loading')
	const panel = document.querySelector('#stocks-detail')
	//*********
	//change
	//*********
	id = 1
	const stockDetailsFromDB = await fetch(`/stock/${id}`)
	const result = await stockDetailsFromDB.json()
	let stockSet = new Set()
	//Get all stock name as a set
	for (let i of result) {
		stockSet.add(i['ticker'])
	}
	//turn set to array
	let stockArr = Array.from(stockSet)
	//prepare to format the data to table on the page
	let query = stockArr.join('&')
	//get stock current price data from python yFinance API
	let yahooStockPrice = await fetch(`http://localhost:8000/stock/${query}`, {
		method: 'GET'
	})
	let parseYF = await yahooStockPrice.json()
	console.log('stocks are', parseYF)
	//Array for data to be printed on the stock page
	let presentData = []
	for (let stock of stockArr) {
		//filter the particular stock for calculation
		let filtered = result.filter((item) => item.ticker === stock)
		let current = 0,
			totalAmount = 0,
			buy = 0,
			sell = 0

		//add up all buy and sell of current stock
		for (let item of filtered) {
			if (!item.is_buy) {
				sell -= parseInt(item.price) * item.amount
				totalAmount += item.amount
			} else {
				buy += parseInt(item.price) * item.amount
				totalAmount += item.amount
			}
		}
		current = parseYF[stock]
		presentData.push({
			ticker: stock,
			amount: totalAmount,
			cost: (buy + sell) / totalAmount,
			current: current
		})
	}
	allStock = presentData
	for (let data of presentData) {
		addStockRow(data.ticker, data.amount, data.cost, data.current, panel)
	}
	//Add eventlistener after the reload button is loaded
	document.querySelector('#stock-reload').disabled = false
}

//add row for users' stocks
function addStockRow(ticker, amount, cost, current, panel) {
	let stockDetailRow = `	<div class="row mt-1 stock-detail">
	<div class="col-3 d-flex"><span>${ticker}</span></div>
	<div class="col-3 d-flex"><span>${amount}</span></div>
	<div class="col-3 d-flex"><span>${cost}</span></div>
	<div class="col-3 d-flex"><span>${current}</span></div>
	</div>`
	panel.innerHTML += stockDetailRow
}

function formSubmitForNewStock() {
	document.querySelector('#stock-form').addEventListener('submit', (e) => {
		e.preventDefault()
		const form = e.target
		const obj = {}
		obj['ticker'] = form.ticker.value
		if (form['buy-sell'].value === 'buy') {
			obj['is_buy'] = true
		}
		if (form['buy-sell'].value === 'sell') {
			obj['is_buy'] = false
		}
		if (form['buy-sell'].value === '') {
			alert('missing buy/sell')
		}
		obj['price'] = form.price.value
		obj['amount'] = form.amount.value
		console.log(obj)
	})
}
//###################################################################################
//MAIN
//###################################################################################
eventListenerOfStockButton()
