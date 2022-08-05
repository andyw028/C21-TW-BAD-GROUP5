import { Request, Response } from 'express'
import { UserServices } from '../services/userServices'

export class UserController {
    constructor(private userService: UserServices) {}

    get = async (req: Request, res: Response) => {
        res.json(await this.userService.getUser())
    }
    post = async (req: Request, res: Response) => {
        res.json()
    }
    put = async (req: Request, res: Response) => {
        res.json()
    }
    delete = async (req: Request, res: Response) => {
        res.json()
    }
}
