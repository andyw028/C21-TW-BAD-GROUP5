import { Request, Response } from 'express'
import { ReceiptServices } from '../services/receiptServices'

export class ReceiptController {
	constructor(private receiptService: ReceiptServices) {}

	get = async (req: Request, res: Response) => {
		try {
			const userID = parseInt(req.params.id)
			if (!userID) {
				res.json({ success: false, message: "userID missing" })
				return
			}
			const allReceipt = await this.receiptService.getReceipt(userID)
			res.json(allReceipt)
		} catch (err) {
			console.error(err.message)
		}
	}

	post = async (req: Request, res: Response) => {
		try {
			const userID = parseInt(req.params.id)
			const receiptName = req.body.shopName
			const receiptDate = req.body.date
			const receiptAmount = parseInt(req.body.amount)
			const receiptImage = req.body.image
			const expensesType = req.body.expensesType
			const is_deleted = false

			if (!userID || !receiptName || !receiptDate || !receiptAmount || !receiptImage || !expensesType) {
				res.json({
					success: false,
					message: 'Body Missing'
				})
				return
			}

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
				res.json({ success: true })
			} else {
				res.json({
					success: false,
					message: 'Fail to save your receipt'
				})
			}
		} catch (err) {
			console.error(err.message)
		}
	}

	put = async (req: Request, res: Response) => {
		try {
			const receiptID = parseInt(req.params.id)
			const revisedVenue = req.body.venue
			const revisedDate = req.body.date
			const revisedAmount = req.body.amount
			const revisedType = req.body.type

			if (!receiptID || !revisedVenue || !revisedDate || !revisedAmount || !revisedType) {
				res.json({ success: false })
				return
			}

			const result = await this.receiptService.updateReceipt(
				receiptID,
				revisedVenue,
				revisedDate,
				revisedAmount,
				revisedType)

			if (result.length === 0) {
				res.json({ success: false })
			} else {
				res.json({ success: true })
			}

		} catch (err) {
			console.error(err.message)
		}
	}

	delete = async (req: Request, res: Response) => {
		try {
			const receiptID = parseInt(req.params.id)
			const result = await this.receiptService.deleteReceipt(receiptID)
			if (result.length === 0) {
				res.json({ success: false })
			}
			res.json({ success: true })

		} catch (err) {
			console.log(err.message)
		}

	}

	getSevenDay = async (req: Request, res: Response) => {
		try {
			const userID = req.params.id
			if (!userID) {
				res.json({ message: 'No params ID' })
				return
			}
			const sevenDaysReceipt =
				await this.receiptService.getSevenDaysReceipt(userID)
			res.json(sevenDaysReceipt)
		} catch (err) {
			console.log(err.message)
		}
	}

	getMonthly = async (req: Request, res: Response) => {
		try {
			const userID = req.params.id
			if (!userID) {
				res.json({ message: 'No params ID' })
				return
			}
			const monthlyTypeReceipt =
				await this.receiptService.getReceiptByThisMonth(userID)
			res.json(monthlyTypeReceipt)
		} catch (e) {
			console.log(e.message)
		}
	}

	submit = async (req: Request, res: Response) => {
		try {
			console.log('Image uploaded')
		} catch (err) {
			res.json({ success: false, message: 'Error, please check' })
		} finally {
			res.json({ success: true })
		}
	}
}
