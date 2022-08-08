//load the mobile nav and the web nav when loaded
function eventListenerOfStockButton() {
	document.querySelector('#stock-btn').addEventListener('click', () => {
		loadStockPage()
	})
	document.querySelector('#m-stock-btn').addEventListener('click', () => {
		loadStockPage()
	})
}

function loadStockPage() {
	//Loading the stock page into the panel
	const panel = document.querySelector('#dashboard-panel')
	//loading the table title plus buttons
	panel.innerHTML = `
	<div class="col-md-12 d-flex flex-row-reverse">
	<button id="stock-reload" class="btn btn-dark text-center">
	<i class="bi bi-arrow-clockwise"></i>
	</button>
	</div>
	<div id="stock-table-title" class="row mt-3">
	<div class="col-3 d-flex"><span>Ticker</span></div>
	<div class="col-3 d-flex"><span>Holding</span></div>
	<div class="col-3 d-flex"><span>Average</span></div>
	<div class="col-3 d-flex"><span>Current</span></div>
	</div>
	`

	//###########
	//Change Here
	//###########
	let name = 'TSLA'
	//This is the stock detail template to add onto the stock panel
	let stockDetailRow = `	<div class="row mt-1 stock-detail">
	<div class="col-3 d-flex"><span>${name}</span></div>
	<div class="col-3 d-flex"><span>${name}</span></div>
	<div class="col-3 d-flex"><span>${name}</span></div>
	<div class="col-3 d-flex"><span>${name}</span></div>
	</div>`
	//Add eventlistener after the reload button is loaded
	document.querySelector('#stock-reload').addEventListener('click', () => {
		console.log('OK')
		loadStockPage()
	})
}

eventListenerOfStockButton()
