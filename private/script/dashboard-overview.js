function eventListenerOfOverviewButton() {
	document.querySelector('#overview-btn').addEventListener('click', () => {
		loadOverview()
	})
}

function loadOverview() {
	const overviewBoard = document.querySelector('#dashboard-panel')

	overviewBoard.innerHTML = `
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
                  <h3>Last Month's Expenses</h3>
                  <h1>$25,000</h1>
                </div>
                <div class="progress">
                  <svg>
                    <circle cx="38" cy="38" r="36"></circle>
                  </svg>
                  <div class="number">
                    <p>70%</p>
                  </div>
                </div>
              </div>
              <small class="text-muted">Last 30 Days</small>
            </div>

            <div class="expenses">
            <span class="material-icons-sharp">bar_chart</span>
            <div class="middle">
              <div class="left">
                <h3>Total Expenses</h3>
                <h1>$14,160</h1>
              </div>
              <div class="progress">
                <svg>
                  <circle cx="38" cy="38" r="36"></circle>
                </svg>
                <div class="number">
                  <p>62%</p>
                </div>
              </div>
            </div>
            <small class="text-muted">Last 24 Hours</small>
          </div>
          <!------------ END OF EXPENSES -------------->
          <div class="income">
            <span class="material-icons-sharp">stacked_line_chart</span>
            <div class="middle">
              <div class="left">
                <h3>Total Income</h3>
                <h1>$10,864</h1>
              </div>
              <div class="progress">
                <svg>
                  <circle cx="38" cy="38" r="36"></circle>
                </svg>
                <div class="number">
                  <p>44%</p>
                </div>
              </div>
            </div>
            <small class="text-muted">Last 24 Hours</small>
          </div>
        </div>
        
        <!------------ END OF INSIGHTS -------------->

        <!-- END OF CHART -->

    </section>
    <!-- END OF MIDDLE -->
</main>`
}

async function retrieveStockPL() {
	const queryString = window.location.pathname.split('/')
	let id = queryString[queryString.length - 1]

	const stockPL = document.querySelector('#stockIncome')
	const stockDetailsFromDB = await fetch(`/stock/${id}`)
	const result = await stockDetailsFromDB.json()
	if (!result[0]) {
		stockPL.innerHTML = 0
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
			`http://localhost:8000/stock/${query}`,
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
		const pl = presentData.reduce((acc, cur) => acc + cur.pl, 0)
		stockPL.innerHTML = pl
	}
}
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
	const monthlyData = await serverDetail.json()
	let monthlyResult = monthlyData.reduce(
		(acc, cur) => acc + parseInt(cur.sum),
		0
	)
	monthlySpend.innerHTML = monthlyResult
	//Daily Spend

	let today = new Date()
	today = formatOneDate(today)
	const serverDailyDetail = await fetch(`/receipt/sevenDays/${id}`)
	let dailyData = await serverDailyDetail.json()
	let dailyDataNew = dailyData.data
	let dailySpending = 0
	dailyDataNew.foreach((item) => {
		if (formatOneDate(item.date) === today) {
			dailySpending += parseFloat(item.price)
		}
	})
	dailySpend.innerHTML = dailySpending
}
eventListenerOfOverviewButton()
loadOverview()
retrieveStockPL()
getMonthlyAndDailySpending()
