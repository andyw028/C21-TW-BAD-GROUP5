import { Request, Response } from 'express'
import { UserServices } from '../services/userServices'
import { checkPassword } from '../utils/hash'
// import { 01_init-data } from '..seeds';

export class UserController {
	constructor(private userService: UserServices) {}

	// put = async (req: Request, res: Response) => {
	//     res.json(await this.userService.updateUser())
	// }
	// delete = async (req: Request, res: Response) => {
	//     res.json(await this.userService.deleteUser())
	// }

	login = async (req: Request, res: Response) => {
		const { username, password } = req.body
		if (!username || !password) {
			res.status(400).json({ message: 'Invalid username or password' })
			return
		}

		const user = await this.userService.getUserByUsername(username)
		console.log(user)
		const verify = user && (await checkPassword(password, user[0].password))
		if (verify) {
			if (req.session) {
				req.session['user'] = { id: user![0].id, username }
			}
			res.status(200).json({
				success: true,
				message: 'Login successfully'
			})
			return
		} else {
			return res
				.status(400)
				.json({ success: false, message: 'Login Failed' })
		}
	}

    signup = async (req: Request, res: Response) => {

        const { username, password, firstName, lastName, email } = req.body;

        if (!username || !password || !firstName || !lastName|| !email ) {
            res.status(400).json({ success: false, message: "Missing important data" });
            return;
        }

        const userResult = await this.userService.checkAC(email,username)

		if (userResult > 0) {
			res.status(400).json({
				success: false,
				message: 'Email already exists'
			})
			return
		}

        const user = await this.userService.addUser(username, password, email, firstName, lastName);
        console.log(user.id)
        console.log(user.username)
        req.session['user'] = { id: user.id, username: user.username }
        res.status(200).json({ success: true, userID:user.id});
        return;
    }

	get = async (req: Request, res: Response) => {
		// const { firstName, lastName, email } = req.body;
	}
}
