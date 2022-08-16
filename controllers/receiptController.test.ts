import { ReceiptController } from './receiptController'
import { ReceiptServices } from '../services/receiptServices'
import type { Request, Response } from 'express'
import type { Knex } from 'knex'
import { createRequest, createResponse } from '../helper'
import { logger } from '../tools/winston'

jest.mock('../services/receiptServices')

describe('receiptController tests', () => {
	let controller: ReceiptController
	let service: ReceiptServices
	let req: Request
	let res: Response

	beforeEach(() => {
		service = new ReceiptServices({} as Knex)
		req = createRequest()
		res = createResponse()
		controller = new ReceiptController(service)
	})
	//Get
	it('get Request - id is NaN', async () => {
		req.params.id = 'CLS'
		await controller.get(req, res)
		expect(res.status).toBeCalledWith(400)
		expect(res.json).toBeCalledTimes(1)
		expect(res.json).toBeCalledWith({
			message: 'Invalid ID'
		})
	})
	it('get Request - id is null', async () => {
		req.params.id = ''
		await controller.get(req, res)
		expect(res.status).toBeCalledWith(400)
		expect(res.json).toBeCalledTimes(1)
		expect(res.json).toBeCalledWith({
			message: 'Invalid ID'
		})
	})
	it('get Request - ERROR case', async () => {
		req.params.id = '1'
		;(service.getReceipt as jest.Mock).mockImplementation(() => {
			throw new Error('Some Error')
		})
		logger.error = jest.fn()
		await controller.get(req, res)
		expect(res.json).not.toBeCalled()
		expect(logger.error).toBeCalled()
	})
	it('get Request - success', async () => {
		req.params.id = '1'
		service.getReceipt = jest.fn(
			() =>
				[
					{
						users_id: 1,
						image: 'testing1.jpeg',
						venue: 'H & M',
						date: '2022-8-8',
						price: 450,
						is_deleted: false,
						type: 'Clothing'
					}
				] as any
		)
		await controller.get(req, res)
		expect(res.json).toBeCalledTimes(1)
		expect(res.json).toBeCalledTimes(1)
		expect(res.json).toBeCalledWith([
			{
				users_id: 1,
				image: 'testing1.jpeg',
				venue: 'H & M',
				date: '2022-8-8',
				price: 450,
				is_deleted: false,
				type: 'Clothing'
			}
		])
	})
	//Post
	it('post request - Missing information', async () => {
		req.params.id = ''
		req.body.shopName = ''
		req.body.date = ''
		req.body.amount = 1
		req.body.image = ''
		req.body.expensesType = 'Clothing'
		await controller.post(req, res)

		expect(res.status).lastCalledWith(400)
		expect(res.json).toBeCalledTimes(1)
		expect(res.json).toBeCalledWith({
			success: false,
			message: 'Missing Information'
		})
	})
	it('post request - result is null', async () => {
		req.params.id = '1'
		req.body.shopName = 'H&M'
		req.body.date = '2022-08-08'
		req.body.amount = 1
		req.body.image = 'image.png'
		req.body.expensesType = 'Clothing'
		service.addReceipt = jest.fn(() => null as any)
		await controller.post(req, res)

		expect(res.status).lastCalledWith(500)
		expect(res.json).toBeCalledTimes(1)
		expect(res.json).toBeCalledWith({
			success: false,
			message: 'Fail to save your receipt'
		})
	})
	it('post request - success', async () => {
		req.params.id = '1'
		req.body.shopName = 'H&M'
		req.body.date = '2022-08-08'
		req.body.amount = 1
		req.body.image = 'image.png'
		req.body.expensesType = 'Clothing'
		service.addReceipt = jest.fn(() => Promise.resolve([{ id: 1 }]))
		await controller.post(req, res)

		expect(res.status).lastCalledWith(200)
		expect(res.json).toBeCalledTimes(1)
		expect(res.json).toBeCalledWith({ success: true })
	})
	//Put
	it('put request - Invalid Data ', async () => {
		req.params.id = 'CLS'
		req.body.venue = 'H&M'
		req.body.date = '2022-08-08'
		req.body.amount = 1
		req.body.type = 'Clothing'
		service.updateReceipt = jest.fn(() => Promise.resolve([{ id: 1 }]))
		await controller.put(req, res)

		expect(res.status).lastCalledWith(400)
		expect(res.json).toBeCalledTimes(1)
		expect(res.json).toBeCalledWith({ success: false })
	})
	it('put request - No Result return ', async () => {
		req.params.id = '1'
		req.body.venue = 'H&M'
		req.body.date = '2022-08-08'
		req.body.amount = 1
		req.body.type = 'Clothing'
		service.updateReceipt = jest.fn(() => Promise.resolve([]))
		await controller.put(req, res)

		expect(res.json).toBeCalledTimes(1)
		expect(res.json).toBeCalledWith({ success: false })
	})
	it('put request - Success ', async () => {
		req.params.id = '1'
		req.body.venue = 'H&M'
		req.body.date = '2022-08-08'
		req.body.amount = 1
		req.body.type = 'Clothing'
		service.updateReceipt = jest.fn(() => Promise.resolve([{ id: 1 }]))
		await controller.put(req, res)

		expect(res.json).toBeCalledTimes(1)
		expect(res.json).toBeCalledWith({ success: true })
	})
	//delete
	it('delete req - Invalid ID', async () => {
		req.params.id = 'AUDHGIAS'
		await controller.delete(req, res)
		expect(res.status).toBeCalledWith(400)
		expect(res.json).toBeCalled()
		expect(res.json).toBeCalledWith({ success: false })
	})
	it('delete req - Empty result returned', async () => {
		req.params.id = '1'
		service.deleteReceipt = jest.fn(() => Promise.resolve([]))
		await controller.delete(req, res)
		expect(res.status).toBeCalledWith(500)
		expect(res.json).toBeCalled()
		expect(res.json).toBeCalledWith({ success: false })
	})
	it('delete req - too much result returned', async () => {
		req.params.id = '1'
		service.deleteReceipt = jest.fn(() => Promise.resolve([{}, {}]))
		await controller.delete(req, res)
		expect(res.status).toBeCalledWith(500)
		expect(res.json).toBeCalled()
		expect(res.json).toBeCalledWith({ success: false })
	})
	it('delete req - Success', async () => {
		req.params.id = '1'
		service.deleteReceipt = jest.fn(() => Promise.resolve([{}]))
		await controller.delete(req, res)
		expect(res.status).toBeCalledWith(200)
		expect(res.json).toBeCalled()
		expect(res.json).toBeCalledWith({ success: true })
	})
	//get7day
	it('get7days req - Invalid ID', async () => {
		req.params.id = 'CLS'
		await controller.getSevenDay(req, res)
		expect(res.status).toBeCalledWith(400)
		expect(res.json).toBeCalled()
		expect(res.json).toBeCalledWith({ message: 'No params ID' })
	})
	it('get7days req - Invalid ID Empty', async () => {
		req.params.id = ''
		await controller.getSevenDay(req, res)
		expect(res.status).toBeCalledWith(400)
		expect(res.json).toBeCalled()
		expect(res.json).toBeCalledWith({ message: 'No params ID' })
	})
	it('get7days req - Success', async () => {
		req.params.id = '1'
		service.getSevenDaysReceipt = jest.fn(() =>
			Promise.resolve({
				dates: [
					'2022-08-09',
					'2022-08-10',
					'2022-08-11',
					'2022-08-12',
					'2022-08-13',
					'2022-08-14',
					'2022-08-15'
				],
				data: []
			})
		)
		await controller.getSevenDay(req, res)
		expect(res.status).toBeCalledWith(200)
		expect(res.json).toBeCalled()
		expect(res.json).toBeCalledWith({
			dates: [
				'2022-08-09',
				'2022-08-10',
				'2022-08-11',
				'2022-08-12',
				'2022-08-13',
				'2022-08-14',
				'2022-08-15'
			],
			data: []
		})
	})
	//GET Monthly
	it('getMonthly req - Invalid ID', async () => {
		req.params.id = 'CLS'
		await controller.getMonthly(req, res)
		expect(res.status).toBeCalledWith(400)
		expect(res.json).toBeCalled()
		expect(res.json).toBeCalledWith({ message: 'No params ID' })
	})
	it('getMonthly req - Invalid ID Empty', async () => {
		req.params.id = ''
		await controller.getMonthly(req, res)
		expect(res.status).toBeCalledWith(400)
		expect(res.json).toBeCalled()
		expect(res.json).toBeCalledWith({ message: 'No params ID' })
	})
	it('getMonthly req - Success', async () => {
		req.params.id = '1'
		service.getReceiptByThisMonth = jest.fn(() =>
			Promise.resolve([
				{
					name: 'Clothing',
					sum: '450.00'
				}
			])
		)
		await controller.getMonthly(req, res)
		expect(res.status).toBeCalledWith(200)
		expect(res.json).toBeCalled()
		expect(res.json).toBeCalledWith([
			{
				name: 'Clothing',
				sum: '450.00'
			}
		])
	})
})
