import { Request, Response } from 'express'
import { ReceiptServices } from '../services/receiptServices'

export class ReceiptController {
	constructor(private receiptService: ReceiptServices) {}

	get = async (req: Request, res: Response) => {
		res.json(await this.receiptService)
	}
	post = async (req: Request, res: Response) => {
		res.json()
	}
}
