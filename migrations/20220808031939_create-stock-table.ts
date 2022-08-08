import { Knex } from 'knex'

const accountTableName = 'accounts'
const stockTableName = 'stock'

export async function up(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(accountTableName)
	await knex.schema.createTable(stockTableName, (table) => {
		table.increments('id')
	})
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(stockTableName)
	await knex.schema.createTable(accountTableName, (table) => {
		table.increments()
		table.decimal('balance')
		table.timestamps(false, true)
	})
}
