import Knex from 'knex'
const knexfile = require('../knexfile') // Assuming you test case is inside `services/ folder`
const knex = Knex(knexfile['test']) // Now the connection is a testing connection.
import { ReceiptServices } from './receiptServices'

//All data is  adding by seed so it will run smoothly when CI
describe('ReceiptService', () => {
	let receiptService: ReceiptServices


	beforeAll(async () => {
		receiptService = new ReceiptServices(knex)
		await knex('receipts').del()
		await knex.insert({
					users_id: 1,
					image: 'testing1.jpeg',
					venue: 'H & M',
					date: '2022-8-8',
					price: 450,
					is_deleted: false,
					type: 1
				}).into("receipts")
	})
	// receipt id will change so match users_id only

	it('should get all receipt', async () => {
		// 1 receipt
		const result = await receiptService.getReceipt(1)
		expect(result).toHaveLength(1)
		expect(result[0].users_id).toEqual(1)
		expect(result[0].image).toEqual('testing1.jpeg')
		expect(result[0].price).toMatch('450.00')
		expect(result[0].type).toEqual(1)
		expect(result[0].venue).toMatch('H & M')
	})

	it("should able to add new receipt", async () => {
		// 2 receipts
		const result = await receiptService.addReceipt
		(1,"Testing receipt","2022-8-16",500,"Testing1.jpeg",2,false)
		expect(result).toBeDefined()
		expect(result).toHaveLength(1)
		const resultAfter = await receiptService.getReceipt(1)
		expect(resultAfter).toHaveLength(2)
		expect(resultAfter[0].price).toMatch('450.00')
		expect(resultAfter[1].price).toMatch('500.00')
	})

	it("should able to edit the receipt", async () => {
		// 3 receipts
		const result = await receiptService.addReceipt
		(1,"Testing edit receipt","2022/10/8",499,"TestingEdit.jpeg",5,false)

		const resultEdit = await receiptService.updateReceipt(result[0].id,"Hong Kong","1997/10/1",1997,5)
		expect(resultEdit[0].id).toEqual(result[0].id)
		const resultAfterEdit = await receiptService.getReceipt(1)
		// 3 receipts
		expect(resultAfterEdit).toHaveLength(3)
		expect(resultAfterEdit[0].venue).toMatch("Hong Kong")
		expect(resultAfterEdit[0].price).toMatch('1997.00')
		expect(resultAfterEdit[0].type).toEqual(5)

	})

	it("should able to delete receipt", async () => {
		// 4 receipts
		const result = await receiptService.addReceipt
		(1,"Testing delete receipt","2022/8/16",700,"TestingDelete.jpeg",2,false)
		expect(result).toBeDefined()
		expect(result).toHaveLength(1)

		const resultDelete = await receiptService.deleteReceipt(result[0].id)
		expect(resultDelete[0].id).toEqual(result[0].id)

		const resultAfterDelete = await receiptService.getReceipt(1)
		expect(resultAfterDelete).toBeDefined()
		expect(resultAfterDelete).toHaveLength(3)
	})


	afterAll(() => {
		knex.destroy()
	})
})
