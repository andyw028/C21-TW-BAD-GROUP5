import { StockController } from './stockController'
import { StockServices } from '../services/stockServices'
import type { Request, Response } from 'express'
import type { Knex } from 'knex'
import { createRequest, createResponse } from '../helper'

jest.mock('../services/StockServices')

describe('stockController test', () => {
	let controller: StockController
	let service: StockServices
	let req: Request
	let res: Response

	beforeEach(() => {
		service = new StockServices({} as Knex)
		service.getStocksByID = jest.fn(() =>
			Promise.resolve({
				id: 1,
				ticker: 'TSLA',
				price: 800.0,
				is_buy: true,
				amount: 1,
				user_id: 1
			})
		)
		service.updateStockTrade = jest.fn(() => Promise.resolve([{ id: 1 }]))
		req = createRequest()
		res = createResponse()
		controller = new StockController(service)
	})

	it('missing param id for get request', async () => {
		req.params.id = ''
		await controller.get(req, res)

		expect(res.status).lastCalledWith(400)
		expect(res.json).toBeCalledTimes(1)
		expect(res.json).toBeCalledWith({ message: 'Invalid ID Provided' })
	})

	it('post stock request without body', async () => {
		req.body = ''
		await controller.post(req, res)

		expect(res.status).lastCalledWith(400)
		expect(res.json).toBeCalledTimes(1)
		expect(res.json).toBeCalledWith({ message: 'No Body Provided' })
	})

	it('success attempt for getting stock', async () => {
		req.params.id = '1'

		await controller.get(req, res)

		expect(res.json).toBeCalledTimes(1)
		expect(res.json).toBeCalledWith({
			id: 1,
			ticker: 'TSLA',
			price: 800.0,
			is_buy: true,
			amount: 1,
			user_id: 1
		})
	})
})
