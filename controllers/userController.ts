import { Request, Response } from 'express';
import { UserServices } from '../services/userServices';
import { checkPassword } from '../utils/hash';
// import { 01_init-data } from '..seeds';

export class UserController {
	constructor(private userService: UserServices) {}

	login = async (req: Request, res: Response) => {
		const { username, password } = req.body
		console.log("login",req.body);
		if (!username || !password) {
			res.status(400).json({ message: 'Invalid username or password' })
			return
		}

		const user = await this.userService.getUserByUsername(username)

		console.log(user);

        const verify = user && await checkPassword(password, user.password);
        if (verify) {
            if (req.session) {
                req.session['user'] = { id: user.id, username };
            }
            res.status(200).json({ success: true, message: "Login successfully" });
            return;
        } else {
            res.status(400).redirect('/login.html?error=Incorrect+Username')
			return;
        }
    };

    signup = async (req: Request, res: Response) => {

        const { username, password, firstName, lastName, email } = req.body;

        if (!username || !password || !firstName || !lastName|| !email ) {
            res.status(400).json({ success: false, message: "Missing important data" });
            return;
        }

        const user = await this.userService.addUser(username, password, email, firstName, lastName);

		// if (username !== user.username ) {
		// 	res.status(400).json({
		// 		success: false,
		// 		message: 'Username already exists'
		// 	})
		// 	return;
		// }

        req.session['user'] = { id: user.id, username }
		console.log("result2", req.session['user'].id);

        res.status(200).json({ success: true, message: "Account created successfully" });
        return;
    };

	get = async (req: Request, res: Response) => {
	};
}
