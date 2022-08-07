//load the mobile nav and the web nav when loaded
function eventListenerOfStockButton() {
	document.querySelector('#stock-btn').addEventListener('click', () => {
		console.log('1')
		loadStockPage()
	})
	document.querySelector('#m-stock-btn').addEventListener('click', () => {
		console.log('2')
		loadStockPage()
	})
}

function loadStockPage() {
	//Loading the stock page into the panel
	const panel = document.querySelector('#dashboard-panel')
	//loading the table title
	panel.innerHTML = `<div id="stock-table-title" class="row">
	<div class="col-md-3">Ticker</div>
	<div class="col-md-3">Holding</div>
	<div class="col-md-3">Average Price</div>
	<div class="col-md-3">Current Price</div>
</div>`
}

eventListenerOfStockButton()
