import { Knex } from 'knex'

export class StockServices {
	constructor(private knex: Knex) {}

	async getStocksByID() {
		return this.knex
	}

	async updateStockTrade() {}

	async deleteStockRecord() {}
}
