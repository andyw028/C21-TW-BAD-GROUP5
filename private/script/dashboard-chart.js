function formatOneDate(date) {
	let dd = String(date.getDate()).padStart(2, '0')
	let mm = String(date.getMonth() + 1).padStart(2, '0') //January is 0!
	let yyyy = date.getFullYear()

	let today = yyyy + '-' + mm + '-' + dd
	return today
}

async function loadcharts() {
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
	console.log(trendDates, trendData)
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
				borderColor: 'rgb(67,57,83)',
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
		]
	}
	const pieConfig = {
		type: 'doughnut',
		data: expenseTypeData
	}
	const pieCharExpense = new Chart(pieChartPlaceHolder, pieConfig)
	// //Pie Chart End
}

// loadcharts()
