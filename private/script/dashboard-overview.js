window.onload = () => {
	loadOverview()
	retrieveStockPL()
	eventListenerOfOverviewButton()
	getMonthlyAndDailySpending()
	loadCharts()
	themeChanger()
}

function eventListenerOfOverviewButton() {
	document.querySelector('#overview-btn').addEventListener('click', () => {
		loadOverview()
		retrieveStockPL()
		getMonthlyAndDailySpending()
		loadCharts()
	})
	document.querySelector('#m-overview-btn').addEventListener('click', () => {
		loadOverview()
		retrieveStockPL()
		getMonthlyAndDailySpending()
		loadCharts()
	})
	document.querySelector('#brand-logo').addEventListener('click', () => {
		const queryString = window.location.pathname.split('/')
		let id = queryString[queryString.length - 1]
		window.location.href = `/dashboard/${id}`
	})
}

function loadOverview() {
	const overviewBoard = document.querySelector('#dashboard-panel')
	overviewBoard.innerHTML = ''
	overviewBoard.innerHTML += `
<main>
    <section class="middle">
        <div class="header">
            <h1>Overview</h1>
        </div>

        <div class="insights">
            <div class="user-info">
              <span class="material-icons-sharp">analytics</span>
              <div class="middle">
                <div class="left">
                  <h3>Welcome back,</h3>
                  <h1 id="username-display"></h1>
                  <h3>Today's expenses</h3>
                  <h1 id="dailySpend">$</h1>
                </div>
				<div class="progress">
			      <div class="circular--landscape"> 
				      <img src="../img/money-pig-icon.jpg" /> 
				  </div>
              </div>
              </div>
              <small class="text-muted">Let's get started.</small>
            </div>

            <div class="expenses">
            <span class="material-icons-sharp">bar_chart</span>
            <div class="middle">
              <div class="left">
                <h3>This month's expenses</h3>
                <h1 id="monthlySpend"></h1>
              </div>
              <div class="progress">
			      <div class="circular--landscape"> 
				      <img src="../img/money-icon.jpg" /> 
				  </div>
              </div>
            </div>
			<small class="text-muted">Last 30 Days</small>
            </div>
          <!------------ END OF EXPENSES -------------->
          <div class="stock-return">
            <span class="material-icons-sharp">stacked_line_chart</span>
            <div class="middle">
              <div class="left">
                <h3>Stock Return</h3>
                <h1 id="stockIncome"></h1>
              </div>
              <div class="progress">
			      <div class="circular--landscape"> 
			      <img src="../img/stock-icon.jpg" /> 
		          </div>
              </div>
            </div>
            <small class="text-muted">Find more details on Stock page.</small>
          </div>
        </div>
        <!------------ END OF EXPENSES -------------->
        <!------------ END OF INSIGHTS -------------->

        <div class="header">
            <h1>My Analysis</h1>
        </div>

        <!-- END OF CHART -->

    </section>
    <!-- END OF MIDDLE -->
</main>
`
	document.querySelector('main').outerHTML += `
	<div class="charts-container">
	<canvas id="pie-chart" ></canvas>
	<canvas id="trend-chart" ></canvas>
	</div>
	`
}

async function themeChanger() {
	const themeBtn = document.querySelector('.theme-btn')

	themeBtn.addEventListener('click', () => {
		document.body.classList.toggle('dark-theme')
		themeBtn.querySelector('span:first-child').classList.toggle('active')
		themeBtn.querySelector('span:last-child').classList.toggle('active')
	})
}

async function retrieveStockPL() {
	const queryString = window.location.pathname.split('/')
	let id = queryString[queryString.length - 1]

	const stockPL = document.querySelector('#stockIncome')

	const stockDetailsFromDB = await fetch(`/stock/${id}`)
	const result = await stockDetailsFromDB.json()
	if (!result[0]) {
		stockPL.innerHTML = `USD$0`
	} else {
		let stockSet = new Set()
		//Get all stock name as a set
		for (let i of result) {
			stockSet.add(i['ticker'].toUpperCase())
		}
		//turn set to array
		let stockArr = Array.from(stockSet)
		for (let stock of stockArr){
			stock = stock.toUpperCase()
		}
		//prepare to format the data to table on the page
		let query = stockArr.join('&')
		//get stock current price data from python yFinance API
		let yahooStockPrice = await fetch(`//python.samor.me/stock/${query}`, {
			method: 'GET'
		})
		let parseYF = await yahooStockPrice.json()
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
			console.log(current)
			current = Math.round((current + Number.EPSILON) * 100) / 100
			presentData.push({
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
		console.log(presentData)
		const pl = presentData.reduce((acc, cur) => {
			console.log(cur)
			if (isNaN(parseInt(cur.pl))){
				continue
			}
			acc += cur.pl
			console.log(acc)
		}, 0)
		stockPL.innerHTML += `USD$` + `${parseInt(pl)}`
	}
}
//make a Date object into formatted YYYY-MM-DD
function formatOneDate(date) {
	let dd = String(date.getDate()).padStart(2, '0')
	let mm = String(date.getMonth() + 1).padStart(2, '0') //January is 0!
	let yyyy = date.getFullYear()

	let today = yyyy + '-' + mm + '-' + dd
	return today
}

async function getMonthlyAndDailySpending() {
	//eventlisteners
	const monthlySpend = document.querySelector('#monthlySpend')
	const dailySpend = document.querySelector('#dailySpend')

	const queryString = window.location.pathname.split('/')
	let id = queryString[queryString.length - 1]

	//Monthly Spend
	const serverMonthlyDetail = await fetch(`/receipt/monthly/${id}`)
	const monthlyData = await serverMonthlyDetail.json()
	let monthlyResult = monthlyData.reduce(
		(acc, cur) => acc + parseInt(cur.sum),
		0
	)
	if (isNaN(monthlyResult)){
		monthlyResult = 0
	}
	monthlySpend.innerHTML = `HKD$${monthlyResult}`
	//Daily Spend

	let today = new Date()
	today = today.toISOString()
	const serverDailyDetail = await fetch(`/receipt/sevenDays/${id}`)
	let dailyData = await serverDailyDetail.json()
	let dailyDataNew = dailyData.data
	let dailySpending = 0
	for (let item of dailyDataNew) {
		if (
			formatOneDate(new Date(today)) ===
			formatOneDate(new Date(item.date))
		) {
			// if the price is not a number 
			if (isNaN(parseInt(item.price))){
				continue
			}else {
			dailySpending += parseInt(item.price)
			}
		}
	}
	dailySpend.innerHTML = `HKD$${dailySpending}`
}

//CHART###########################################################################

function formatOneDate(date) {
	let dd = String(date.getDate()).padStart(2, '0')
	let mm = String(date.getMonth() + 1).padStart(2, '0') //January is 0!
	let yyyy = date.getFullYear()

	let today = yyyy + '-' + mm + '-' + dd
	return today
}

async function loadCharts() {
	let id = window.location.pathname.split('/').at(-1)
	//Pie Chart is for this month's expenses
	const pieChartPlaceHolder = document.querySelector('#pie-chart')
	//Trend Chart is for last 7 days expenses
	const trendChartPLaceHolder = document.querySelector('#trend-chart')

	//Getting Data from server
	const pie = await fetch(`/receipt/monthly/${id}`)
	const trend = await fetch(`/receipt/sevenDays/${id}`)
	let pieResult = await pie.json()
	let trendResult = await trend.json()

	//For the Trend Chart Start
	let trendDates = trendResult.dates
	let trendData = trendResult.data
	let trendChartData = [0, 0, 0, 0, 0, 0, 0]
	trendDates.forEach((date, index) => {
		for (let data of trendData) {
			let currentDate = formatOneDate(new Date(data.date))
			let price = parseInt(data.price)
			if (currentDate === date) {
				trendChartData[index] += price
			}
		}
	})

	const trendChartDetails = {
		labels: trendDates,
		datasets: [
			{
				label: 'Expense of Pass 7 Days',
				data: trendChartData,
				borderColor: '#9362DC',
				fill: false,
				tension: 0.3
			}
		]
	}
	const trendConfig = {
		type: 'line',
		data: trendChartDetails
	}
	const trendExpense = new Chart(trendChartPLaceHolder, trendConfig)
	//Trend Chart End

	// //Pie Chart Start
	let consumptionTypes = []
	let eachConsumptionTotal = [0, 0, 0, 0, 0, 0]

	pieResult.forEach((item, index) => {
		consumptionTypes[index] = item.name
		eachConsumptionTotal[index] += parseInt(item.sum)
	})
	const expenseTypeData = {
		labels: consumptionTypes,
		datasets: [
			{
				data: eachConsumptionTotal,
				backgroundColor: [
					'rgb(255, 99, 132)',
					'rgb(54, 162, 235)',
					'rgb(25, 100, 86)',
					'rgb(55, 205, 86)',
					'rgb(255, 5, 86)',
					'rgb(255, 5, 186)'
				],
				hoverOffset: 6
			}
		],
		options: {
			maintainAspectRatio: false
		}
	}
	const pieConfig = {
		type: 'doughnut',
		data: expenseTypeData
	}
	const pieCharExpense = new Chart(pieChartPlaceHolder, pieConfig)
	if (!consumptionTypes[0]) {
		pieChartPlaceHolder.style.display = 'none'
	}
	// //Pie Chart End
}
