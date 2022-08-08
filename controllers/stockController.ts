import { Request, Response } from 'express'
import { StockServices } from '../services/stockServices'

export class stockController {
	constructor(private stockService: StockServices) {}

	get = async (req: Request, res: Response) => {
		res.json(await this.stockService.getStocksByID())
	}
	post = async (req: Request, res: Response) => {
		res.json()
	}
	delete = async (req: Request, res: Response) => {
		res.json()
	}
}
