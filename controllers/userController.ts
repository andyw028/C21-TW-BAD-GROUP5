import { Request, Response } from 'express'
// import { request } from 'http'
// import { userInfo } from 'os'
// import { stringify } from 'querystring'
import { UserServices } from '../services/userServices'
import { checkPassword } from '../utils/hash'

export class UserController {
	constructor(private userService: UserServices) {}

	login = async (req: Request, res: Response) => {
		const { username, password } = req.body
		if (!username || !password) {
			res.status(400).json({
				success: false,
				message: 'Invalid username or password'
			})
			return
		}
		const user = await this.userService.getUserByUsername(username)
		if (!user || !user[0]) {
			res.status(400).json({
				success: false,
				message: 'No such User'
			})
			return
		} else {
			let hashed = user[0]['password']
			const verify = user && (await checkPassword(password, hashed))
			if (verify) {
				req.session['user'] = { id: user[0]['id'], username: username }
				res.status(200).json({
					success: true,
					message: 'Login successfully',
					id: user[0]['id']
				})
				return
			} else {
				return res
					.status(400)
					.json({ success: false, message: 'Login Failed' })
			}
		}
	}

	signUp = async (req: Request, res: Response) => {
		const { username, password, firstName, lastName, email } = req.body

		if (!username || !password || !firstName || !lastName || !email) {
			res.status(400).json({
				success: false,
				message: 'Missing important data'
			})
			return
		}

		const userResult = await this.userService.checkAC(email, username)

		if (userResult > 1) {
			res.status(400).json({
				success: false,
				message: 'Email already exists'
			})
			return
		} else {
			const user = await this.userService.addUser(
				username,
				password,
				email,
				firstName,
				lastName
			)
			req.session['user'] = { id: user.id, username: user.username }
			res.status(200).json({ success: true, userID: user.id })
		}
	}

	get = async (req: Request, res: Response) => {
		let id = req.params.id // req.session.user.id
		if (isNaN(parseInt(id))) {
			res.status(400).json({ message: 'No ID provided' })
			return
		}

		const userInfo = await this.userService.getUSerByID(id)
		res.status(200).json(userInfo)
	}
	post = async (req: Request, res: Response) => {
		const form = req.body
		const id = req.params.id

		if (!form || !id || isNaN(parseInt(id))) {
			res.json({ message: 'Invalid' })
			return
		}

		if (!form['firstName']) {
			res.json({ message: 'Invalid firstName' })
			return
		}
		const result = await this.userService.changeUserInfo(
			form['firstName'],
			form['lastName'],
			form['email'],
			form['password'],
			id
		)

		res.json(result)
	}
}
