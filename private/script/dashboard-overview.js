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
                  <h3>Welcome back,</h3>
                  <h1 id="username-display"></h1>
                  <h3>Today's expenses</h3>
                  <h1 id="dailySpend">$</h1>
                </div>
              </div>
              <!-- <small class="text-muted">Let's get started.</small> -->
            </div>

            <div class="expenses">
            <span class="material-icons-sharp">bar_chart</span>
            <div class="middle">
              <div class="left">
                <h3>Last month's expenses</h3>
                <h1 id="monthlySpend">$</h1>
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
            <small class="text-muted">Last 30 Days</small>
            </div>
          <!------------ END OF EXPENSES -------------->
          <div class="stock-return">
            <span class="material-icons-sharp">stacked_line_chart</span>
            <div class="middle">
              <div class="left">
                <h3>Stock return</h3>
                <h1 id="stockIncome">$</h1>
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
        <!------------ END OF EXPENSES -------------->
        <!------------ END OF INSIGHTS -------------->

        <div class="header">
            <h1>My Analysis</h1>
        </div>

        <!-- END OF CHART -->

    </section>
    <!-- END OF MIDDLE -->
</main>`
    document.querySelector('body').innerHTML += ` 
	`
}




// async function themeChanger() {
//     const themeBtn = document.querySelector('.theme-btn');

//     themeBtn.addEventListener('click', () => {
//         document.body.classList.toggle('dark-theme');

//         themeBtn.querySelector('span:first-child').classList.toggle('active');
//         themeBtn.querySelector('span:last-child').classList.toggle('active');
//     })
// };

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
// themeChanger()
loadOverview()
retrieveStockPL()
getMonthlyAndDailySpending()
