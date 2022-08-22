import { Knex } from 'knex'

const accountTableName = 'accounts'
const stockTableName = 'stocks'

export async function up(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(accountTableName)
	await knex.schema.createTable(stockTableName, (table) => {
		table.increments('id')
		table.string('ticker').notNullable()
		table.decimal('price').notNullable()
		table.boolean('is_buy').notNullable()
		table.integer('amount').notNullable()
		table.integer('user_id').notNullable().unsigned()
		table.foreign('user_id').references('users.id')
		table.timestamps(false, true)
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
