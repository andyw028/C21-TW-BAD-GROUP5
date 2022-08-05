import { Knex } from 'knex'

export class ReceiptServices {
    constructor(private knex: Knex) {}

    async getReceipt() {
        return await this.knex('receipts').select('*')
    }

    async addReceipt() {}

    async updateReceipt() {}

    async deleteReceipt() {}
}
