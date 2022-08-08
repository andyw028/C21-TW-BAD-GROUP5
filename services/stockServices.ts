import { Knex } from 'knex'

export class StockServices {
	constructor(private knex: Knex) {}

	async getStocksByID(id: number) {
		return this.knex('stocks').select('*').where('user_id', '=', `${id}`)
	}

	async updateStockTrade() {}

	async deleteStockRecord() {}
}
