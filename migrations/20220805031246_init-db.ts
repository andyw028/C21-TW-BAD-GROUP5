import { Knex } from "knex";

const userTableName = "users";
const accountTableName = "accounts";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(userTableName, (table) => {
        table.increments();
        table.string("username").unique().notNullable();
        table.string("password").notNullable();
        table.string("first_name").notNullable();
        table.string("last_name").notNullable();
        




        table.timestamps(false, true);
    })
    await knex.schema.createTable(accountTableName, (table) => {
        table.increments();
        table.string("balance");
        table.timestamps(false, true);
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(accountTableName);
    await knex.schema.dropTableIfExists(userTableName);
}

