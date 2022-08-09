import { Knex } from 'knex'

export class ReceiptServices {
	constructor(private knex: Knex) {}

	async getReceipt(id:string) {
		return await this.knex('receipts').select('*').where("users_id", id)
	}

	async addReceipt() {}

	async updateReceipt() {}

	async deleteReceipt() {}
}
