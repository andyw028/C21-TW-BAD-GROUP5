import { Knex } from 'knex'

export class UserServices {
	constructor(private knex: Knex) {}

	async getUser() {
		return await this.knex('users').select('*')
	}

	async addUser() {}

	async updateUser() {}

	async deleteUser() {}
}
