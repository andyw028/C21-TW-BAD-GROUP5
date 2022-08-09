import { Knex } from 'knex'

export class StockServices {
	constructor(private knex: Knex) {}

	async getStocksByID(id: number | string) {
		console.log('get stock')
		return this.knex('stocks').select('*').where('user_id', '=', id)
	}

	async updateStockTrade(
		user_id: number,
		ticker: string,
		price: number,
		amount: number,
		is_buy: boolean
	) {
		console.log(user_id, ticker, price, amount, is_buy)
		return this.knex('stocks')
			.insert([
				{
					ticker: ticker,
					price: price,
					is_buy: is_buy,
					amount: amount,
					user_id: user_id
				}
			])
			.returning('user_id')
	}

	async deleteStockRecord() {}
}
