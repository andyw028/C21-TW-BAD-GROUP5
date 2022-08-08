import { Request, Response } from 'express'
import { ReceiptServices } from '../services/receiptServices'

export class ReceiptController {
	constructor(private receiptService: ReceiptServices) {}

	get = async (req: Request, res: Response) => {
		try{
		const userId = req.params.id
		const allReceipt = await this.receiptService.getReceipt(userId)
		res.json(allReceipt)
		
	} catch (err) {
		console.error(err.message)
	}

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
