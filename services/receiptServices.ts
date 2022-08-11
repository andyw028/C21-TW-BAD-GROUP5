import { Knex } from 'knex'

export class ReceiptServices {
	constructor(private knex: Knex) {}

	async getReceipt(id: string|number) {
		const result = await this.knex('receipts')
			.select('*')
			.where('users_id', id)
			.andWhere('is_deleted', false)
		return result
	}

	async getReceiptByThisMonth(id: string) {}

	async getSevenDaysReceipt(id: string) {
		//###################################################################
		//####################FUNCTIONS THAT GET 7 DAYS######################
		//###################################################################
		function getPreviousDay(date = new Date(), days: number) {
			const previous = new Date(date.getTime())
			previous.setDate(date.getDate() - days)
			return previous
		}

		function getPreviousSixDay() {
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

		function formatOneDate(date: any) {
			let dd = String(date.getDate()).padStart(2, '0')
			let mm = String(date.getMonth() + 1).padStart(2, '0') //January is 0!
			let yyyy = date.getFullYear()

			let today = yyyy + '-' + mm + '-' + dd
			return today
		}

		let dates = getPreviousSixDay()

		function formatDate(dateArr: Array<Date | string>) {
			for (let i = 0; i < dateArr.length; i++) {
				dateArr[i] = formatOneDate(dateArr[i])
			}
			return dateArr
		}
		//HERE IS THE 7 DAYS' DATE
		let formatted = formatDate(dates)
		console.log(formatted)
		//###################################################################
		//###################################################################
		//###################################################################
		let sevenDaysData = await this.knex('receipts')
			.select('date', 'price')
			.where('date', '<=', formatted[6])
			.andWhere('date', '>=', formatted[0])
		return { dates: formatted, data: sevenDaysData }
	}

	async addReceipt(
		userID: number,
		receiptName: string,
		receiptDate: string | number,
		receiptAmount: number,
		receiptImage: string,
		expensesType: number,
		is_deleted: boolean
	) {
		const receiptID = await this.knex
			.insert({
				users_id: userID,
				image: receiptImage,
				venue: receiptName,
				date: receiptDate,
				price: receiptAmount,
				type: expensesType,
				is_deleted: is_deleted
			})
			.into('receipts')
			.returning('id')
		return receiptID
	}

	async updateReceipt(receiptID:number, venue:string,date:string|number,price:number ,type:number) {

		const result = await this.knex('receipts').update({venue:venue, date:date, price:price, type:type}).where("id", receiptID).returning("id")
		return result
		


	}

	async deleteReceipt(receiptID:number) {

		const result = await this.knex('receipts').update({is_deleted:true}).where("id", receiptID).returning("id")
		return result

	}
}
