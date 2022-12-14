import { UserServices } from './userServices'
import type { Knex as KnexType } from 'knex'
import Knex from 'knex'
import knexConfig from '../knexfile'

describe('UserServices', () => {
	let service: UserServices
	let knex: KnexType

	beforeAll(() => {
		knex = Knex(knexConfig['test'])
	})

	beforeEach(async () => {
		service = new UserServices(knex)
	})

	test('get username by username - success', async () => {
		const username = 'admin'

		const user = await service.getUserByUsername(username)
		expect(user).toBeDefined()
	})

	test('get username by username - failed to find the user', async () => {
		await knex('users').where('username', 'andy').del()
		const username = 'andy'
		const user = await service.getUserByUsername(username)

		expect(user[0]).not.toBeDefined()
	})

	test('add users - success', async () => {
		await knex('users').where('username', 'andy').del()
		const user = await service.addUser(
			'andy',
			'1234',
			'andywong@tecky.io',
			'Andy',
			'Wong'
		)

		expect(user).toBeDefined()
		expect(user.username).toEqual('andy')
	})

	// test("add users - failed", async () => {

	//   const user = await service.addUser("John", "1234", "andywong1@tecky.io", "Andy", "Wong")
	//   expect(user).not.toBeDefined();
	// });

	afterAll(async () => {
		await knex.destroy()
	})
})
