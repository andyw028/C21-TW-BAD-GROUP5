import { Knex } from "knex";
import { hashPassword } from "../utils/hash";
const userTableName = "users";
const accountTableName = "accounts";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(userTableName).del();

    // Inserts seed entries
    await knex(userTableName).insert([
        {username: "admin", password: await hashPassword("admin")},
    ]);
    await knex(accountTableName).insert([
        {balance: ""},
    ]);
};
