import { Knex } from 'knex'

const userTableName = 'account'

export async function up(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(userTableName)
	await knex.schema.createTable(userTableName, (table) => {
		table.increments('id').notNullable()
		table.string('name').notNullable()
		table.string('email').notNullable()
	})
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(userTableName)
	await knex.schema.createTable(userTableName, (table) => {
		table.increments()
		table.string('email')
	})
}
