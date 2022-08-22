import { Knex } from 'knex'

const userTableName = 'users'
const stockTableName = 'stocks'
const receiptTableName = 'receipts'
const typeTableName = 'types'

export async function up(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('stocks')
	await knex.schema.dropTableIfExists('receipts')
	await knex.schema.dropTableIfExists('types')
	await knex.schema.dropTableIfExists('account')
	await knex.schema.dropTableIfExists('users')
	await knex.schema.createTable(userTableName, (table) => {
		table.increments()
		table.string('first_name').notNullable()
		table.string('last_name').notNullable()
		table.string('email').notNullable()
		table.string('username').unique().notNullable()
		table.string('password').notNullable()
		table.boolean('is_banned').notNullable()
		table.boolean('is_admin').notNullable()
		table.timestamps(false, true)
	})
	await knex.schema.createTable(stockTableName, (table) => {
		table.increments('id').notNullable()
		table.string('ticker').notNullable()
		table.decimal('price').notNullable()
		table.boolean('is_buy').notNullable()
		table.integer('amount').notNullable()
		table.integer('user_id').notNullable()
		table.foreign('user_id').references('users.id')
		table.timestamps(false, true)
	})
	await knex.schema.createTable(typeTableName, (table) => {
		table.increments()
		table.string('name')
		table.timestamps(false, true)
	})
	await knex.schema.createTable(receiptTableName, (table) => {
		table.increments()

		table.integer('users_id').unsigned().notNullable()
		table.foreign('users_id').references('users.id')
		table.text('image').notNullable()
		table.text('venue').notNullable()
		table.date('date').notNullable()
		table.decimal('price').notNullable()
		table.boolean('is_deleted').notNullable()
		table.integer('type').unsigned().notNullable()
		table.foreign('type').references('types.id')
		table.timestamps(false, true)
	})
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('receipts')
	await knex.schema.dropTableIfExists('types')
	await knex.schema.dropTableIfExists('stocks')
	await knex.schema.dropTableIfExists('users')
}
