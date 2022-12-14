import { UserController } from './userController'
import { UserServices } from '../services/userServices'
import { checkPassword } from '../utils/hash'
import { hashPassword } from '../utils/hash'

import type { Request, Response } from 'express'
import type { Knex } from 'knex'
import { createRequest, createResponse } from '../helper'
import { knex } from '../tools/knexConfig'

jest.mock('../services/userServices')
jest.mock('../utils/hash')

describe('UserController', () => {
	let controller: UserController
	let service: UserServices
	let req: Request
	let res: Response

	beforeEach(() => {
		service = new UserServices({} as Knex)
		service.getUserByUsername = jest.fn(() =>
			Promise.resolve([
				{ id: 1, username: 'admin', password: 'hashedPassword' }
			])
		)

		req = createRequest()
		res = createResponse()
		;(checkPassword as jest.Mock).mockResolvedValue(true)
		controller = new UserController(service)

		service.addUser = jest.fn(() =>
			Promise.resolve({ id: 1, username: 'admin' })
		)
		;(hashPassword as jest.Mock).mockResolvedValue(true)
		controller = new UserController(service)
	})

	it('login test - missing username', async () => {
		req.body = { password: '1234' }

		await controller.login(req, res)

		expect(res.status).lastCalledWith(400)
		expect(res.json).lastCalledWith({
			success: false,
			message: 'Invalid username or password'
		})
		expect(res.json).toBeCalledTimes(1)
	})

	it('login test - missing password', async () => {
		req.body = { username: '1234' }

		await controller.login(req, res)

		expect(res.status).lastCalledWith(400)
		expect(res.json).lastCalledWith({
			success: false,
			message: 'Invalid username or password'
		})
		expect(res.json).toBeCalledTimes(1)
	})

	it('login test - success', async () => {
		const username = 'admin'
		const password = '1234'

		req.body = { username, password }
		await controller.login(req, res)

		expect(service.getUserByUsername).toBeCalledWith(username)
		expect(checkPassword).toBeCalledWith(password, 'hashedPassword')
		expect(req.session.user).toEqual({ id: 1, username: username })
		expect(res.json).toBeCalledWith({
			success: true,
			message: 'Login successfully',
			id: 1
		})
	})

	it('signup test - missing username', async () => {
		const username = ''
		const password = '1234'
		const firstName = 'John'
		const lastName = 'Leung'
		const email = 'johnleung@tecky.io'
		req.body = { username, password, firstName, lastName, email }
		await controller.signUp(req, res)

		expect(res.status).lastCalledWith(400)
		expect(res.json).lastCalledWith({
			success: false,
			message: 'Missing important data'
		})
		expect(res.json).toBeCalledTimes(1)
	})

	it('signup test - duplicate username', async () => {
		const username = 'admin'
		const password = '1234'
		const firstName = 'John'
		const lastName = 'Leung'
		const email = 'johnleung@tecky.io'
		;(service.checkAC as jest.Mock).mockResolvedValue(2)
		req.body = { username, password, firstName, lastName, email }
		await controller.signUp(req, res)

		expect(res.status).lastCalledWith(400)
		expect(res.json).lastCalledWith({
			success: false,
			message: 'Email already exists'
		})
		expect(res.json).toBeCalledTimes(1)
	})

	it('signup test - success', async () => {
		const username = 'roy'
		const password = '1234'
		const firstName = 'Roy'
		const lastName = 'Chan'
		const email = 'roychan@tecky.io'

		req.body = { username, password, firstName, lastName, email }
		await controller.signUp(req, res)

		expect(res.status).lastCalledWith(200)
		expect(req.session.user).toBeDefined()
		expect(res.json).lastCalledWith({ success: true, userID: 1 })
		expect(res.json).toBeCalledTimes(1)
	})

	afterAll(async () => {
		await knex.destroy()
	})
})
