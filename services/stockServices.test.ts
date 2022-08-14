import Knex from 'knex'
const knexfile = require('../knexfile') // Assuming you test case is inside `services/ folder`
const knex = Knex(knexfile['test']) // Now the connection is a testing connection.
import { StockServices } from './stockServices'

describe('StockService', () => {
	let stockService: StockServices

	beforeEach(async () => {
		stockService = new StockServices(knex)
	})

	it('should get all stock', async () => {
		const stocks = await stockService.getStocksByID(1)
		expect(stocks).toHaveLength(1)
		expect(stocks[0]).toEqual({
			ticker: 'TSLA',
			price: '600.00',
			is_buy: true,
			amount: 1,
			user_id: 1
		})
	})
	afterEach(() => {
		knex.destroy()
	})
})
