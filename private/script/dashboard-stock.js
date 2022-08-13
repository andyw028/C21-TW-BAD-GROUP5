let GlobalStock

//load the mobile nav and the web nav when loaded
function eventListenerOfStockButton() {
	if (document.querySelector('#dashboard-panel')) {
		document.querySelector('#dashboard-panel').innerHTML = ''
	}
	document.querySelector('#stock-btn').addEventListener('click', async () => {
		if (
			document.querySelector('#stocks-detail') &&
			document.querySelector('#info-spot')
		) {
			document.querySelector('#stocks-detail').innerHTML = ``
			document.querySelector('#info-spot').innerHTML = ``
		}
		loadStockPage()
		const curBtn = document.querySelector('#stock-reload')
		curBtn.disabled = true
		await loadUserStocks()
		await loadDailyStockDetail()
		curBtn.disabled = false
	})
	document
		.querySelector('#m-stock-btn')
		.addEventListener('click', async () => {
			if (
				document.querySelector('#stocks-detail') &&
				document.querySelector('#info-spot')
			) {
				document.querySelector('#stocks-detail').innerHTML = ``
				document.querySelector('#info-spot').innerHTML = ``
			}
			loadStockPage()
			const curBtn = document.querySelector('#stock-reload')
			curBtn.disabled = true
			await loadUserStocks()
			await loadDailyStockDetail()
			curBtn.disabled = false
		})
}

function loadStockPage() {
	console.log('adding page')
	//Loading the stock page into the panel
	const panel = document.querySelector('#dashboard-panel')
	//loading the table title plus buttons
	panel.innerHTML = `				<div class="col-md-12 d-flex flex-row-reverse">
	<!-- Button trigger modal -->
	<button
		type="button"
		id="add-stock"
		class="btn btn-dark m-1"
		data-bs-toggle="modal"
		data-bs-target="#exampleModal1"
	>
		<i class="bi bi-plus-square"></i>
	</button>

	<!-- Modal -->
	<div
		class="modal fade"
		id="exampleModal1"
		tabindex="-1"
		aria-labelledby="exampleModalLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-body">
					<!-- FORM -->
					<form id="stock-form">
						<div class="mb-3">
							<label for="" class="form-label"
								>Ticker</label
							>
							<input
								name="ticker"
								class="form-control"
								id="ticker"
								aria-describedby="emailHelp"
								required=""
							/>
							<div
								id="Ticker-Warn"
								class="form-text"
							>
								Make Sure Your Ticker is Correct
							</div>
						</div>
						<div class="mb-3">
							<label
								for="buy-sell"
								class="form-label"
								>Buy or Sell?</label
							>
							<select
								class="form-select"
								name="buy-sell"
								aria-label="Default select example"
								required=""
							>
								<option value="buy">Buy</option>
								<option value="sell">
									Sell
								</option>
							</select>
						</div>
						<div class="mb-3">
							<label
								for="Price"
								class="form-label"
								>Price</label
							>
							<input
								name="price"
								class="form-control"
								id="price"
								required=""
							/>
						</div>
						<div class="mb-3">
							<label
								for="Amount"
								class="form-label"
								>Amount</label
							>
							<input
								name="amount"
								class="form-control"
								id="amount"
								required=""
							/>
						</div>
						<button
							type="class"
							class="btn btn-primary"
						>
							Submit
						</button>
						<button
							id="close-modal"
							type="button"
							class="btn btn-secondary"
							data-bs-dismiss="modal"
						>
							Close
						</button>
					</form>
				</div>
			</div>
		</div>
	</div>

	<button
		id="stock-reload"
		class="btn btn-dark text-center m-1"
	>
		<i class="bi bi-arrow-clockwise"></i>
	</button>
</div>
<div>
	<div class="row">
		<div id="user-stock" class="col-md-8 p-2">
			<div class="text-center mb-5">
				<h1 class="">My Profile</h1>
			</div>
			<div
				id="stock-table-title"
				class="d-flex mt-3 justify-content-center"
			>
				<div
					class="col-2 d-flex justify-content-center"
				>
					<span>Ticker</span>
				</div>
				<div
					class="col-1 d-flex justify-content-center"
				>
					<span>Qty</span>
				</div>
				<div
					class="col-3 d-flex justify-content-center"
				>
					<span>Cost(USD)</span>
				</div>
				<div
					class="col-3 d-flex justify-content-center"
				>
					<span>Current(USD)</span>
				</div>
				<div
					class="col-3 d-flex justify-content-center"
				>
					<span>PL(USD)</span>
				</div>
			</div>
			<div id="stocks-detail"></div>
		</div>
		<div id="info-spot" class="col-md-4 mt-4">
			<div id="day-gainer" class="mb-2 col-md-12 p-2">
				<div class="text-center mb-5">
					<h2>Top Ten Gainer</h2>
				</div>
				<div
					class="d-flex justify-content-center detail-title"
				>
					<div class="col-4 text-center">Ticker</div>
					<div class="col-4 text-center">Price</div>
					<div class="col-4 text-center">Changes</div>
				</div>
			</div>
			<div id="day-loser" class="mb-2 col-md-12 p-2">
				<div class="text-center mb-5">
					<h2>Top Ten Loser</h2>
				</div>
				<div
					class="d-flex justify-content-around detail-title"
				>
					<div class="col-4 text-center">Ticker</div>
					<div class="col-4 text-center">Price</div>
					<div class="col-4 text-center">Changes</div>
				</div>
			</div>
			<div id="day-active" class="mb-2 col-md-12 p-2">
				<div class="text-center mb-5">
					<h2>Top Ten Active</h2>
				</div>
				<div
					class="d-flex justify-content-around detail-title"
				>
					<div class="col-4 text-center">Ticker</div>
					<div class="col-4 text-center">Price</div>
					<div class="col-4 text-center">Changes</div>
				</div>
			</div>
		</div>
	</div>
</div>
	`

	document
		.querySelector('#stock-reload')
		.addEventListener('click', async () => {
			if (
				document.querySelector('#stocks-detail') &&
				document.querySelector('#info-spot')
			) {
				document.querySelector('#stocks-detail').innerHTML = ``
				document.querySelector('#info-spot').innerHTML = ``
			}
			loadStockPage()
			const curBtn = document.querySelector('#stock-reload')
			curBtn.disabled = true
			await loadUserStocks()
			await loadDailyStockDetail()
			curBtn.disabled = false
		})
	formSubmitForNewStock()
}

//load all stock and calculates
async function loadUserStocks() {
	console.log('loading')
	const panel = document.querySelector('#stocks-detail')
	//spinner
	const loader = `<div class="d-flex justify-content-center mt-1">
	<div class="spinner-border" role="status">
	  <span class="visually-hidden">Loading...</span>
	</div>
  </div>`
	panel.innerHTML = loader
	const queryString = window.location.pathname.split('/')
	let id = queryString[queryString.length - 1]

	const stockDetailsFromDB = await fetch(`/stock/${id}`)
	const result = await stockDetailsFromDB.json()
	if (!result[0]) {
		panel.innerHTML = ``
	} else {
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
		let yahooStockPrice = await fetch(
			`http://python.samor.me/stock/${query}`,
			{
				method: 'GET'
			}
		)
		let parseYF = await yahooStockPrice.json()
		// console.log('stocks are', parseYF)
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
					totalAmount -= item.amount
				} else {
					buy += parseInt(item.price) * item.amount
					totalAmount += item.amount
				}
			}

			current = parseYF[stock]
			current = Math.round((current + Number.EPSILON) * 100) / 100
			presentData.push({
				ticker: stock,
				amount: totalAmount,
				cost: Math.round(
					(((buy + sell) / totalAmount + Number.EPSILON) * 100) / 100
				),
				current: current,
				pl:
					(current -
						Math.round(
							(((buy + sell) / totalAmount + Number.EPSILON) *
								100) /
								100
						)) *
					totalAmount
			})
		}
		GlobalStock = presentData
		panel.innerHTML = ``
		for (let data of presentData) {
			let earn = Math.round(((data.pl + Number.EPSILON) * 100) / 100)
			await addStockRow(
				data.ticker,
				data.amount,
				data.cost,
				data.current,
				earn,
				panel
			)
		}
	}
}

//add row for users' stocks
async function addStockRow(ticker, amount, cost, current, pl, panel) {
	let stockDetailRow = `	<div class="row m-3 justify-content-center stock-detail">
	<div class="col-2 d-flex justify-content-center"><span><img
	src="https://eodhistoricaldata.com/img/logos/US/${ticker}.png"
	class="rounded-circle"
	width="25px"
	height="25px"
	style="margin-right: 2px"
/>${ticker}</span></div>
	<div class="col-1 d-flex justify-content-center"><span>${amount}</span></div>
	<div class="col-3 d-flex justify-content-center"><span>$${cost}</span></div>
	<div class="col-3 d-flex justify-content-center"><span>$${current}</span></div>
	<div class="col-3 d-flex justify-content-center"><span>$${pl}</span></div>
	</div>`
	panel.innerHTML += stockDetailRow
}

function formSubmitForNewStock() {
	document
		.querySelector('#stock-form')
		.addEventListener('submit', async (e) => {
			e.preventDefault()
			//make the form
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

			//for loop checking if the amount is larger than the QTY
			if (!obj['is_buy']) {
				for (let stock of GlobalStock) {
					if (
						stock.ticker === obj['ticker'] &&
						form['amount'].value
					) {
						obj['amount'] = form['amount'].value
						console.log('cls')
					}
				}
			} else {
				obj['amount'] = form['amount'].value
			}
			obj['price'] = form.price.value
			//checking
			if (!obj.ticker || !obj.price || !obj.amount) {
				alert("You Haven't Enter All Detail")
			} else {
				const queryString = window.location.pathname.split('/')
				let id = queryString[queryString.length - 1]
				const result = await fetch(`/stock/${id}`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(obj)
				})
				let DBResult = await result.json()
				console.log('updated', DBResult)
				//Clear the form just to be sure
				document.getElementById('stock-form').reset()
				await loadUserStocks()
			}
		})
	document.querySelector('#close-modal').addEventListener('click', () => {
		document.getElementById('stock-form').reset()
	})
}

async function loadDailyStockDetail() {
	const loader = `<div class="d-flex justify-content-center mt-1">
	<div class="spinner-border" role="status">
	  <span class="visually-hidden">Loading...</span>
	</div>
  </div>`
	document.querySelector(`#day-gainer`).innerHTML += loader
	document.querySelector(`#day-loser`).innerHTML += loader
	document.querySelector(`#day-active`).innerHTML += loader
	console.log('loading gainers')
	const gainer = await fetch('python.samor.me/stockgainer')
	const gainerinfo = await gainer.json()
	const loser = await fetch('python.samor.me/stockloser')
	const loserinfo = await loser.json()
	const active = await fetch('python.samor.me/stockactive')
	const activeinfo = await active.json()
	console.log(gainerinfo, loserinfo, activeinfo)
	document.querySelector(`#day-gainer`).innerHTML = `<div class="text-center">
	<h3>Top Ten Gainer</h3>
</div>
<div
	class="d-flex justify-content-center detail-title"
>
	<div class="col-4 text-center">Ticker</div>
	<div class="col-4 text-center">Price</div>
	<div class="col-4 text-center">Changes</div>
</div>`
	document.querySelector(`#day-loser`).innerHTML = `								<div class="text-center">
	<h3>Top Ten Loser</h3>
</div>
<div
	class="d-flex justify-content-around detail-title"
>
	<div class="col-4 text-center">Ticker</div>
	<div class="col-4 text-center">Price</div>
	<div class="col-4 text-center">Changes</div>
</div>`
	document.querySelector(`#day-active`).innerHTML = `								<div class="text-center">
	<h3>Top Ten Active</h3>
</div>
<div
	class="d-flex justify-content-around detail-title"
>
	<div class="col-4 text-center">Ticker</div>
	<div class="col-4 text-center">Price</div>
	<div class="col-4 text-center">Changes</div>
</div>`
	loadDailyRow('day-gainer', gainerinfo)
	loadDailyRow('day-loser', loserinfo)
	loadDailyRow('day-active', activeinfo)
}
function loadDailyRow(htmlID, arrayOfObject) {
	const insert = document.querySelector(`#${htmlID}`)
	for (let item of arrayOfObject) {
		insert.innerHTML += `							<div
		class="d-flex justify-content-around stock-row"
	>
		<div class="col-4 d-flex text-center justify-content-center mb-1"><img
		src="https://eodhistoricaldata.com/img/logos/US/${item['Symbol']}.png"
		class="rounded-circle"
		width="25px"
		height="25px"
		style="margin-right: 2px"
	/>${item['Symbol']}</div>
		<div class="col-4 text-center">${item['Price (Intraday)']}</div>
		<div class="col-4 text-center">${item['% Change']}%</div>
	</div>`
	}
}
//###################################################################################
//MAIN
//###################################################################################
eventListenerOfStockButton()
