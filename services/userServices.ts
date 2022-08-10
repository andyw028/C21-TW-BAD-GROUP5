import { Knex } from 'knex'
import { hashPassword } from '../utils/hash'

export class UserServices {
	constructor(private knex: Knex) {}

	async getUserByUsername(username: string) {
		return await this.knex('users')
			.where('username', username)
			.returning(['id', 'username', 'password'])
	}

	async addUser(
		username: string,
		password: string,
		email: string,
		firstName: string,
		lastName: string
	) {
		let isBanned = false
		let isAdmin = false
		const hashedPassword = await hashPassword(password)

		let userInfo = {
			username: username,
			password: hashedPassword,
			email: email,
			first_name: firstName,
			last_name: lastName,
			is_banned: isBanned,
			is_admin: isAdmin
		}

		return (
			await this.knex('users')
				.insert(userInfo)
				.returning(['id', 'username'])
		)[0]
	}

	async updateUser(
		username: string,
		password: string,
		email: string,
		firstName: string,
		lastName: string
	) {}

	async checkAC() {}
}
