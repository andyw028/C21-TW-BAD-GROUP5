import Knex from 'knex'
const knexfile = require('../knexfile') // Assuming you test case is inside `services/ folder`
const knex = Knex(knexfile['test']) // Now the connection is a testing connection.
import { ReceiptServices } from './receiptServices'

//All data is  adding by seed so it will run smoothly when CI
describe('ReceiptService', () => {
	let receiptService: ReceiptServices

	beforeEach(async () => {
		receiptService = new ReceiptServices(knex)
	})

	it('should get all receipt', async () => {
		const result = await receiptService.getReceipt(1)
		expect(result).toHaveLength(1)
		expect(result[0].id).toEqual(1)
		expect(result[0].image).toEqual('testing1.jpeg')
		expect(result[0].price).toMatch('450.00')
		expect(result[0].type).toEqual(1)
		expect(result[0].venue).toMatch('H & M')
	})
	afterEach(() => {
		knex.destroy()
	})
})
