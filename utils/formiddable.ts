import { form } from '../server'
import { Request, Response, NextFunction } from 'express'
import type { Fields, Files } from 'formidable'
// const formidable = require("formidable");

declare global {
	namespace Express {
		interface Request {
			form?: {
				fields: Fields
				files: Files
			}
		}
	}
}

export const formidableMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	form.parse(req, (err, fields, files) => {
		if (err) {
			console.error(err)
			res.sendStatus(500)
			return
		}
		req.form = { fields, files }
		next()
	})
}
