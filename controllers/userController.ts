import { Request, Response } from 'express';
import { UserServices } from '../services/userServices';
import { checkPassword } from '../utils/hash';
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
			res.status(401).json({ message: 'Invalid username or password' })
			return
		}

		const user = await this.userService.getUserByUsername(username)

        const verify = user && await checkPassword(password, user.password);
        if (verify) {
            if (req.session) {
                req.session['user'] = { id: user.id, username };
            }
            res.status(200).json({ success: true, message: "Login successfully" });
            return;
        } else {
            return res.status(401).redirect('/login.html?error=Incorrect+Username')
        }
    };

    signup = async (req: Request, res: Response) => {

        const { username, password, firstName, lastName, email } = req.body;

        if (!username || !password || !firstName || !lastName|| !email ) {
            res.status(400).json({ success: false, message: "Missing important data" });
            return;
        }

		if (username) {
			res.status(400).json({
				success: false,
				message: 'Username already exists'
			})
			return
		}

		if (email) {
			res.status(400).json({
				success: false,
				message: 'Email already exists'
			})
			return
		}

        const user = await this.userService.addUser(username, password, email, firstName, lastName);
        req.session['user'] = { id: user.id, username }
        res.status(200).json({ success: true, message: "Account created successfully" });
        return;
    }

    get = async (req: Request, res: Response) => {

       // const { firstName, lastName, email } = req.body; 
    }
}
