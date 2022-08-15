import { Knex } from 'knex'

export class StockServices {
	constructor(private knex: Knex) {}

	async getStocksByID(id: number | string): Promise<any> {
		return this.knex('stocks')
			.select('ticker', 'price', 'is_buy', 'amount', 'user_id')
			.where('user_id', '=', id)
	}

	async updateStockTrade(
		user_id: number | string,
		ticker: string,
		price: number,
		amount: number,
		is_buy: boolean
	) {
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
