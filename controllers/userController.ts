import { Request, Response } from 'express'
import { UserServices } from '../services/userServices'
import { checkPassword } from '../utils/hash'

export class UserController {
	constructor(private userService: UserServices) {}

	// put = async (req: Request, res: Response) => {
	//     res.json(await this.userService.updateUser())
	// }
	// delete = async (req: Request, res: Response) => {
	//     res.json(await this.userService.deleteUser())
	// }

	login = async (req: Request, res: Response) => {
		console.log(req.body)
		const { username, password } = req.body
		console.log(username, password)
		if (!username || !password) {
			res.status(400).json({ message: 'Invalid username or password' })
			return
		}

		const user = await this.userService.getUserByUsername(username)
		console.log('This is return value', user)
		let hashed = user[0]['password']
		console.log(hashed)
		const verify = user && (await checkPassword(password, hashed))
		console.log(verify)
		if (verify) {
			if (req.session) {
				req.session['user'] = { id: user[0]['id'], username }
			}
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

	signUp = async (req: Request, res: Response) => {
		const { username, password, firstName, lastName, email } = req.body

		if (!username || !password || !firstName || !lastName || !email) {
			res.status(400).json({
				success: false,
				message: 'Missing important data'
			})
			return
		}

		if (username) {
			res.status(400).json({
				success: false,
				message: 'Username already exists'
			})
			return
		}

		const user = await this.userService.addUser(
			username,
			password,
			email,
			firstName,
			lastName
		)
		req.session['user'] = { id: user.id, username }
		res.status(200).json({
			success: true,
			message: 'Account created successfully'
		})
		return
	}

	get = async (req: Request, res: Response) => {
		// const { firstName, lastName, email } = req.body;
	}
}
