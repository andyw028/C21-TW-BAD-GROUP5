import { Knex } from 'knex'
import { hashPassword } from '../utils/hash'
import { User } from './models'

export class UserServices {
	constructor(private knex: Knex) {}

	async getUserByUsername(username: string) {
		// SELECT id, username, password FROM users WHERE username = 'XXX' LIMIT 1
		return this.knex<User>('users')
			.where('username', username)
			.select(['id', 'username', 'password'])
			.first()
	}

	async getUSerByID(id: any) {
		return await this.knex('users')
			.select('username', 'email', 'first_name', 'last_name')
			.where('id', id)
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

	async changeUserInfo(
		firstName: string,
		lastName: string,
		email: string,
		password: string,
		id: string | number
	) {
		const hashedPW = await hashPassword(password)
		return await this.knex('users')
			.update({
				email: email,
				first_name: firstName,
				last_name: lastName,
				password: hashedPW
			})
			.where('id', id)
			.returning('id')
	}

	async checkAC(username: string, userEmail: string) {
		const resultCount = (
			await this.knex('users')
				.select('*')
				.where('username', username)
				.orWhere('email', userEmail)
		).length
		return resultCount
	}
}
