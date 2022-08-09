import { Knex } from 'knex'

const userTableName = 'users'
const accountTableName = 'accounts'
const receiptTableName = 'receipts'
const typeTableName = 'types'

export async function up(knex: Knex): Promise<void> {
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
	await knex.schema.createTable(accountTableName, (table) => {
		table.increments()
		table.decimal('balance')
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
	await knex.schema.dropTableIfExists(receiptTableName)
	await knex.schema.dropTableIfExists(accountTableName)
	await knex.schema.dropTableIfExists(userTableName)
	await knex.schema.dropTableIfExists(typeTableName)
}
