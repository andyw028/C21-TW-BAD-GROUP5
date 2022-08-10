import { Knex } from 'knex'

export class ReceiptServices {
	constructor(private knex: Knex) { }

	async getReceipt(id: string) {
		const result =  await this.knex('receipts').select('*').where("users_id", id).andWhere("is_deleted",false)
		return result
	}

	async addReceipt(userID: number, receiptName: string, receiptDate: string | number, receiptAmount: number, receiptImage: string,expensesType:number,is_deleted:boolean) { 
		const receiptID = await this.knex.insert({users_id: userID, image:receiptImage, venue:receiptName, date:receiptDate, price: receiptAmount,type:expensesType,is_deleted:is_deleted}).into("receipts").returning("id")
		return receiptID

	}

	async updateReceipt() { }

	async deleteReceipt() { }
}
