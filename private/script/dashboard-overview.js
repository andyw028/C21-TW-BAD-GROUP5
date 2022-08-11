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
            <div class="sales">
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
        </div>
        <!------------ END OF SALES -------------->
        
        <div class="monthly-report">
            <div class="report">
                <h3>Income</h3>
                <div>
                    <details>
                        <h1>$50,000</h1>
                        <h6 class="success">+10.5%</h6>
                    </details>
                    <p class="text-muted">Compared to last month</p>
                </div>
            </div>
            <!-- END OF INCOME REPORT -->
            <div class="report">
                <h3>Expenses</h3>
                <div>
                    <details>
                        <h1>$15,000</h1>
                        <h6 class="danger">-5.5%</h6>
                    </details>
                    <p class="text-muted">Compared to last month</p>
                </div>
            </div>
            <!-- END OF EXPENSES REPORT -->
            <div class="report">
                <h3>Stocks Returns</h3>
                <div>
                    <details>
                        <h1>$10,000</h1>
                        <h6 class="success">5.0%</h6>
                    </details>
                    <p class="text-muted">Compared to last month</p>
                </div>
            </div>
            <!-- END OF STOCKS RETURNS -->
        </div>
        <!-- END OF MONTHLY REPORT -->

        <div class="fast-payment">
            <h2>Total expenses</h2>
            <div class="badges">
                <div class="badge">
                    <span class="material-icons-sharp">add</span>
                </div>
                <div class="badge">
                    <span class="bg-primary"></span>
                    <div>
                        <h5>Fitness</h5>
                        <h4>$500</h4>
                    </div>
                </div>
                <div class="badge">
                    <span class="bg-success"></span>
                    <div>
                        <h5>Broadband</h5>
                        <h4>$200</h4>
                    </div>
                </div>
                <div class="badge">
                    <span class="bg-primary"></span>
                    <div>
                        <h5>Water</h5>
                        <h4>$300</h4>
                    </div>
                </div>
                <div class="badge">
                    <span class="bg-danger"></span>
                    <div>
                        <h5>Entertainment</h5>
                        <h4>$350</h4>
                    </div>
                </div>
                <div class="badge">
                    <span class="bg-primary"></span>
                    <div>
                        <h5>Education</h5>
                        <h4>$999</h4>
                    </div>
                </div>
                <div class="badge">
                    <span class="bg-danger"></span>
                    <div>
                        <h5>Electricity</h5>
                        <h4>$109</h4>
                    </div>
                </div>
                <div class="badge">
                    <span class="bg-success"></span>
                    <div>
                        <h5>Lunch</h5>
                        <h4>$1500</h4>
                    </div>
                </div>
                <div class="badge">
                    <span class="bg-success"></span>
                    <div>
                        <h5>Dinner</h5>
                        <h4>$3000</h4>
                    </div>
                </div>
            </div>
        </div>
        <!-- END OF TOTAL EXPENSES -->

        <!------------ END OF INSIGHTS -------------->

        <!-- END OF CHART -->

    </section>
    <!-- END OF MIDDLE -->

    <section class="right">

        <div class="recent-transactions">
            <div class="header">
                <h2>Recent Receipts</h2>
                <a href="#">More <span class="material-icons-sharp">chevron_right</span>
                </a>
            </div>
    
            <div class="transaction">
                <div class="service">
                    <div class="icon bg-danger-light">
                        <span class="material-icons-sharp danger">sports_esports</span>
                    </div>
                    <div class="details">
                        <h4>Video games</h4>
                        <p>09/08/2022</p>
                    </div>
                </div>
                <div class="card-details">
                    <div class="details">
                        <p>Octopus</p>
                        <small class="text-muted">Cash</small>
                    </div>
                </div>
                <h4>-HKD$100</h4>
            </div>
            <!-------- END OF RECEIPTS --------->

            <div class="transaction">
                <div class="service">
                    <div class="icon bg-danger-light">
                        <span class="material-icons-sharp danger">medication</span>
                    </div>
                    <div class="details">
                        <h4>Medic</h4>
                        <p>09/08/2022</p>
                    </div>
                </div>
                <div class="card-details">
                    <div class="card bg-primary">
                        <img src="./images/visa.png">
                    </div>
                    <div class="details">
                        <p>*1920</p>
                        <small class="text-muted">Credit Card</small>
                    </div>
                </div>
                <h4>-HKD$1000</h4>
            </div>
            <!-------- END OF RECEIPTS --------->

            <div class="transaction">
                <div class="service">
                    <div class="icon bg-success-light">
                        <span class="material-icons-sharp success">fitness_center</span>
                    </div>
                    <div class="details">
                        <h4>Gym room</h4>
                        <p>09/08/2022</p>
                    </div>
                </div>
                <div class="card-details">

                    <div class="details">
                        <p>Octopus</p>
                        <small class="text-muted">Cash</small>
                    </div>
                </div>
                <h4>-HKD$50</h4>
            </div>
            <!-------- END OF RECEIPTS --------->
        </div>
        <!-------- END OF RECENT RECEIPTS --------->
        <div class="investments">
            <div class="header">
                <h2>Stocks Tracker</h2>
                <a href="#">More <span class="material-icons-sharp">chevron_right</span></a>
            </div>

            <div class="investment">
                <img src="./images/tesla.png">
                <h4>Tesla</h4>
                <div class="date-time">
                    <p>9 AUG, 2022</p>
                    <small class="text-muted">01:00pm</small>
                </div>
                <div class="bonds">
                    <p>TSLA</p>
                    <small class="text-muted">Stock</small>
                </div>
                <div class="amount">
                    <h4>$10,000</h4>
                    <small class="success">1.51%</small>
                </div>
            </div>

            <div class="investment">
                <img src="./images/mcdonalds.png">
                <h4>McDonald's</h4>
                <div class="date-time">
                    <p>9 AUG, 2022</p>
                    <small class="text-muted">01:00pm</small>
                </div>
                <div class="bonds">
                    <p>MCD</p>
                    <small class="text-muted">Stock</small>
                </div>
                <div class="amount">
                    <h4>$20,000</h4>
                    <small class="danger">-0.34%</small>
                </div>
            </div>
            <!-- END OF INVESTMENT -->
        </div>
        <!-------------------------- END OF INVESTMENTS ------------------------>
    </section>
    <!-- END OF RIGHT -->
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
