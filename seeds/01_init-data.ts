import { Knex } from 'knex'
import { hashPassword } from '../utils/hash'

const userTableName = 'users'
const stockTableName = 'stocks'
const receiptTableName = 'receipts'
const typeTableName = 'types'

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('stocks').del()
	await knex(receiptTableName).del()
	await knex(typeTableName).del()
	await knex(userTableName).del()

	// Inserts seed entries

	const typeId = await knex(typeTableName)
		.insert([
			{ name: 'Clothing' },
			{ name: 'Food' },
			{ name: 'Housing' },
			{ name: 'Travel' },
			{ name: 'Shopping' },
			{ name: 'Others' }
		])
		.returning('id')

	const userId = await knex(userTableName)
		.insert([
			{
				first_name: 'Sam',
				last_name: 'Chan',
				email: 'samchan@tecky.io',
				username: 'admin',
				password: await hashPassword('1234'),
				is_banned: 'false',
				is_admin: 'true'
			}
		])
		.returning('id')

	await knex(receiptTableName).insert([
		{
			users_id: userId[0].id,
			image: 'testing1.jpeg',
			venue: 'H & M',
			date: '2022-8-8',
			price: 450,
			is_deleted: false,
			type: typeId[0].id
		}
	])
	await knex(stockTableName).insert([
		{
			ticker: 'TSLA',
			price: 600.0,
			is_buy: true,
			amount: 1,
			user_id: 1
		}
	])
	// await knex(accountTableName).insert([{ balance: '' }])
}
