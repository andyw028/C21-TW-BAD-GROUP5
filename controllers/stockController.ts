import { Request, Response } from 'express'
import { StockServices } from '../services/stockServices'

export class StockController {
	constructor(private stockService: StockServices) {}

	get = async (req: Request, res: Response) => {
		try {
			const userID: string = req.params.id
			if (!userID) {
				res.status(400).json({ msg: 'Invalid ID Provided' })
				return
			}

			res.json(await this.stockService.getStocksByID(parseInt(userID)))
		} catch (e) {
			//#########Logger later
			console.error(e.message)
		}
	}
	post = async (req: Request, res: Response) => {
		// let id = req.session.id
		let id = 1
		let form = req.body
		const result = await this.stockService.updateStockTrade(
			id,
			form.ticker,
			parseInt(form.price),
			parseInt(form.amount),
			form.is_buy
		)
		console.log(result)
		res.json(result)
	}
	delete = async (req: Request, res: Response) => {
		res.json()
	}
}
