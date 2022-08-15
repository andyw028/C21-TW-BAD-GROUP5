import { Knex } from 'knex'
import {
	formatDate,
	formatToMonthStartAndEnd,
	getPreviousSixDay
} from '../utils/date'

export class ReceiptServices {
	constructor(private knex: Knex) {}

	async getReceipt(id: string | number) {
		const result = await this.knex('receipts')
			.select('*')
			.where('users_id', id)
			.andWhere('is_deleted', false)
		return result
	}

	async getReceiptByThisMonth(id: string) {
		let today = new Date()
		let { start, end } = formatToMonthStartAndEnd(today)
		const monthlyResult = await this.knex('receipts')
			.innerJoin('types', 'receipts.type', 'types.id')
			.groupBy('types.name')
			.select('types.name')
			.sum('receipts.price')
			.where('receipts.users_id', id)
			.where('receipts.date', '>=', `${start}`)
			.andWhere('receipts.date', '<', `${end}`)
		console.log(monthlyResult)
		return monthlyResult
	}

	async getSevenDaysReceipt(id: string) {
		//###################################################################
		//####################FUNCTIONS THAT GET 7 DAYS######################
		//###################################################################
		let dates = getPreviousSixDay()

		//HERE IS THE 7 DAYS' DATE
		let formatted = formatDate(dates)

		//###################################################################
		//###################################################################
		//###################################################################
		let sevenDaysData = await this.knex('receipts')
			.select('date', 'price')
			.where('date', '<=', formatted[6])
			.andWhere('date', '>=', formatted[0])
			.where('receipts.users_id', id)
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

	async updateReceipt(
		receiptID: number,
		venue: string,
		date: string | number,
		price: number,
		type: number
	) {
		const result = await this.knex('receipts')
			.update({ venue: venue, date: date, price: price, type: type })
			.where('id', receiptID)
			.returning('id')
		return result
	}

	async deleteReceipt(receiptID: number) {
		const result = await this.knex('receipts')
			.update({ is_deleted: true })
			.where('id', receiptID)
			.returning('id')
		return result
	}
}
