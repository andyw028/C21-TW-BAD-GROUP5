import { Request, Response, NextFunction } from 'express'

export class ApplicationError extends Error {
	constructor(public httpCode: number, message: string) {
		super(message)

		Object.setPrototypeOf(this, ApplicationError.prototype)
	}
}

export function errorHandler(
	err: ApplicationError,
	req: Request,
	res: Response,
	next: NextFunction
) {
	console.log('errorHandler is triggered')
	res.status(err.httpCode).json({ message: err.message })
}

// ;(() => {
// 	try {
// 		throw new ApplicationError(400, 'test')
// 	} catch (err) {
// 		console.log(err instanceof ApplicationError)
// 	}
// })()
