import type { Request, Response, NextFunction } from 'express'

declare module 'express-session' {
	interface SessionData {
		user?: {
			id: number
			username: string
		}
	}
}

export function isLoggedInStatic(
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (req.session.user) {
		next()
	} else {
		res.redirect('/login')
	}
}

export function isLoggedInApi(req: Request, res: Response, next: NextFunction) {
	if (req.session.user) {
		next()
	} else {
		res.status(401).redirect('/404.html')
	}
}

export function isExactUser(req: Request, res: Response, next: NextFunction) {
	if (
		req.session['user'] &&
		parseInt(req.params.id) !== req.session['user']['id']
	) {
		res.status(401).redirect('/404.html')
		return
	}
	next()
}
