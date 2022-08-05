import { Request, Response } from 'express'
import { UserServices } from '../services/userServices'

export class UserController {
    constructor(private userService: UserServices) {}

    get = async (req: Request, res: Response) => {
        res.json(await this.userService.getUser())
    }
    post = async (req: Request, res: Response) => {
        res.json(await this.userService.addUser())
    }
    put = async (req: Request, res: Response) => {
        res.json(await this.userService.updateUser())
    }
    delete = async (req: Request, res: Response) => {
        res.json(await this.userService.deleteUser())
    }
}
