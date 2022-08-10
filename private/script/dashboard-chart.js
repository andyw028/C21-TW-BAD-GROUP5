// const ConsumptionTypes = [
// 	'Clothing',
// 	'Food',
// 	'Housing',
// 	'Travel',
// 	'Shopping',
// 	'Other'
// ]
// const expenseType = {
// 	labels: ConsumptionTypes,
// 	datasets: [
// 		{
// 			data: [100, 200, 250, 150, 300, 50],
// 			backgroundColor: [
// 				'rgb(255, 99, 132)',
// 				'rgb(54, 162, 235)',
// 				'rgb(25, 100, 86)',
// 				'rgb(55, 205, 86)',
// 				'rgb(255, 5, 86)',
// 				'rgb(255, 5, 186)'
// 			],
// 			hoverOffset: 6
// 		}
// 	]
// }

// const pieConfig = {
// 	type: 'doughnut',
// 	data: expenseType
// }
// const pieCharExpense = new Chart(
// 	document.querySelector('#pie-chart-expense'),
// 	pieConfig
// )

// const trendDate = [
// 	'2020-1-1',
// 	'2020-1-2',
// 	'2020-1-3',
// 	'2020-1-4',
// 	'2020-1-5',
// 	'2020-1-6',
// 	'2020-1-7',
// 	'2020-1-8'
// ]

// const trendData = {
// 	labels: trendDate,
// 	datasets: [
// 		{
// 			labels: 'Expense of Pass 7 Days',
// 			data: [150, 220, 300, 70, 400, 200, 150, 100],
// 			borderColor: 'rgb(67,57,83)',
// 			fill: false,
// 			tension: 0.3
// 		}
// 	]
// }

// const trendConfig = {
// 	type: 'line',
// 	data: trendData
// }

// const trendExpense = new Chart(
// 	document.querySelector('#trend-expense'),
// 	trendConfig
// )

async function loadcharts() {
	let id = window.location.pathname.split('/').at(-1)
	//Pie Chart is for this month's expenses
	const pieChartPlaceHolder = document.querySelector('#pie-chart')
	//Trend Chart is for last 7 days expenses
	const trendChartPLaceHolder = document.querySelector('#trend-chart')

	// const pie = await fetch(`/_/${id}`)
	const trend = await fetch(`/receipt/sevenDays/${id}`)
	// let pieResult = await pie.json()
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
				labels: 'Expense of Pass 7 Days',
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
}

// function getPreviousDay(date = new Date(), days) {
// 	const previous = new Date(date.getTime())
// 	previous.setDate(date.getDate() - days)
// 	return previous
// }

// function getPreviousSixDay() {
// 	let dateArr = []
// 	let today = new Date()
// 	dateArr.unshift(today)
// 	dateArr.unshift(getPreviousDay(today, 1))
// 	dateArr.unshift(getPreviousDay(today, 2))
// 	dateArr.unshift(getPreviousDay(today, 3))
// 	dateArr.unshift(getPreviousDay(today, 4))
// 	dateArr.unshift(getPreviousDay(today, 5))
// 	dateArr.unshift(getPreviousDay(today, 6))
// 	return dateArr
// }

function formatOneDate(date) {
	let dd = String(date.getDate()).padStart(2, '0')
	let mm = String(date.getMonth() + 1).padStart(2, '0') //January is 0!
	let yyyy = date.getFullYear()

	let today = yyyy + '-' + mm + '-' + dd
	return today
}

// let dates = getPreviousSixDay()

// function formatDate(dateArr) {
// 	for (let i = 0; i < dateArr.length; i++) {
// 		dateArr[i] = formatOneDate(dateArr[i])
// 	}
// 	return dateArr
// }

// let formatted = formatDate(dates)
// console.log(formatted)

loadcharts()
