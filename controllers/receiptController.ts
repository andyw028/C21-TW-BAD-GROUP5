import { Request, Response } from 'express'
import { ReceiptServices } from '../services/receiptServices'
import { logger } from '../tools/winston'

export class ReceiptController {
	constructor(private receiptService: ReceiptServices) {}

	get = async (req: Request, res: Response) => {
		try {
			const userID = parseInt(req.params.id)

			if (!userID || isNaN(userID)) {
				res.status(400).json({
					message: 'Invalid ID'
				})
				return
			}

			const allReceipt = await this.receiptService.getReceipt(userID)
			res.json(allReceipt)
		} catch (err) {
			logger.error(err.toString())
		}
	}

	post = async (req: Request, res: Response) => {
		try {
			if (
				!req.params.id ||
				!req.body.shopName ||
				!req.body.date ||
				!req.body.amount ||
				!req.body.image ||
				!req.body.expensesType
			) {
				res.status(400).json({
					success: false,
					message: 'Missing Information'
				})
				return
			}
			const userID = parseInt(req.params.id)
			const receiptName = req.body.shopName
			const receiptDate = req.body.date
			const receiptAmount = parseInt(req.body.amount)
			const receiptImage = req.body.image
			const expensesType = req.body.expensesType
			const is_deleted = false

			const result = await this.receiptService.addReceipt(
				userID,
				receiptName,
				receiptDate,
				receiptAmount,
				receiptImage,
				expensesType,
				is_deleted
			)

			if (result) {
				res.status(200).json({ success: true })
			} else {
				res.status(500).json({
					success: false,
					message: 'Fail to save your receipt'
				})
			}
		} catch (err) {
			logger.error(err.toString())
		}
	}

	put = async (req: Request, res: Response) => {
		try {
			const receiptID = parseInt(req.params.id)
			const revisedVenue = req.body.venue
			const revisedDate = req.body.date
			const revisedAmount = req.body.amount
			const revisedType = req.body.type

			if (
				!revisedVenue ||
				!revisedDate ||
				!revisedAmount ||
				!revisedType ||
				isNaN(receiptID)
			) {
				res.status(400).json({ success: false })
				return
			}

			const result = await this.receiptService.updateReceipt(
				receiptID,
				revisedVenue,
				revisedDate,
				revisedAmount,
				revisedType
			)

			if (result.length === 0) {
				res.status(400).json({ success: false })
			} else {
				res.json({ success: true })
			}
		} catch (err) {
			logger.error(err.toString())
		}
	}

	delete = async (req: Request, res: Response) => {
		try {
			const receiptID = parseInt(req.params.id)
			if (isNaN(receiptID)) {
				res.status(400).json({ success: false })
				return
			}
			const result = await this.receiptService.deleteReceipt(receiptID)
			if (result.length === 0 || result.length > 1) {
				res.status(500).json({ success: false })
			}
			res.status(200).json({ success: true })
		} catch (err) {
			logger.error(err.toString())
		}
	}

	getSevenDay = async (req: Request, res: Response) => {
		try {
			const userID = req.params.id
			if (!userID || isNaN(parseInt(userID))) {
				res.status(400).json({ message: 'No params ID' })
				return
			}
			const sevenDaysReceipt =
				await this.receiptService.getSevenDaysReceipt(userID)
			res.status(200).json(sevenDaysReceipt)
		} catch (err) {
			logger.error(err.toString())
		}
	}

	getMonthly = async (req: Request, res: Response) => {
		try {
			const userID = req.params.id
			if (!userID || isNaN(parseInt(userID))) {
				res.status(400).json({ message: 'No params ID' })
				return
			}
			const monthlyTypeReceipt =
				await this.receiptService.getReceiptByThisMonth(userID)
			res.status(200).json(monthlyTypeReceipt)
		} catch (e) {
			console.log(e.message)
		}
	}

	submit = async (req: Request, res: Response) => {
		try {
			
		} catch (err) {
			logger.error(err.toString())
			res.json({ success: false, message: 'Error, please check' })
		} finally {
			res.json({ success: true })
		}
	}
}
