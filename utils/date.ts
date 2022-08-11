//###########################################################
//#############This is get monthly date Func#################
//###########################################################
export function formatToMonthStartAndEnd(date: Date) {
	let mm = String(date.getMonth() + 1).padStart(2, '0') //January is 0!
	let mm2 = String(date.getMonth() + 2).padStart(2, '0') //January is 0!
	let yyyy = date.getFullYear()

	let start = yyyy + '-' + mm + '-' + '01'
	let end = yyyy + '-' + mm2 + '-' + '01'
	return { start, end }
}

//###########################################################
//#########This is get previous seven date Func##############
//###########################################################
export function formatDate(dateArr: Array<Date | string>) {
	for (let i = 0; i < dateArr.length; i++) {
		dateArr[i] = formatOneDate(dateArr[i])
	}
	return dateArr
}

export function formatOneDate(date: any) {
	let dd = String(date.getDate()).padStart(2, '0')
	let mm = String(date.getMonth() + 1).padStart(2, '0') //January is 0!
	let yyyy = date.getFullYear()

	let today = yyyy + '-' + mm + '-' + dd
	return today
}

export function getPreviousDay(date = new Date(), days: number) {
	const previous = new Date(date.getTime())
	previous.setDate(date.getDate() - days)
	return previous
}

export function getPreviousSixDay() {
	let dateArr = []
	let today = new Date()
	dateArr.unshift(today)
	dateArr.unshift(getPreviousDay(today, 1))
	dateArr.unshift(getPreviousDay(today, 2))
	dateArr.unshift(getPreviousDay(today, 3))
	dateArr.unshift(getPreviousDay(today, 4))
	dateArr.unshift(getPreviousDay(today, 5))
	dateArr.unshift(getPreviousDay(today, 6))
	return dateArr
}
