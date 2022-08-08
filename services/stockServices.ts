import { Knex } from 'knex'

export class StockServices {
	constructor(private knex: Knex) {}

	async getStocksByID(id: number | string) {
		console.log('get stock')
		return this.knex('stocks').select('*').where('user_id', '=', id)
	}

	async updateStockTrade(
		userid: number,
		ticker: string,
		price: number,
		amount: number,
		is_buy: boolean
	) {
		console.log(userid, ticker, price, amount, is_buy)
		return this.knex('stocks')
			.insert([
				{
					ticker: ticker,
					price: price,
					is_buy: is_buy,
					amount: amount,
					user_id: userid
				}
			])
			.returning('user_id')
	}

	async deleteStockRecord() {}
}
