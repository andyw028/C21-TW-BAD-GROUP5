import { Knex } from 'knex'
import { userInfo } from 'os'

export class UserServices {
	constructor(private knex: Knex) {}

	async getUser() {
		let response = await fetch(userInfo.userInfo)
		let data = await response.json()
		return await this.knex('users').select('*')
	}

	async addUser() {}

	async updateUser() {}

	async deleteUser() {}
}
