import express from 'express'
import { userController, receiptController, stockController } from '../server'
import path from 'path'
import { formidableMiddleware } from '../utils/formiddable'
import { isExactUser, isLoggedInApi, isLoggedInStatic } from '../utils/guards'

export const routes = express.Router()

routes.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

//###############
//Direction to login page and register page
//Please don't uses these route for POST users update/reg
//###############
routes.get('/login', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'public', 'login.html'))
})
routes.get('/logout', (req, res) => {
	console.log('ok')
	req.session['user'] = undefined
	res.json({ logout: true })
})
routes.get('/dashboard/:id', isLoggedInApi, isExactUser, (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'private', 'dashboard.html'))
})

// testing, need to delete later
routes.get('/testing', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'private', 'dashboard.html'))
})

//Users route MCV
routes.post('/login', userController.login)
routes.post('/signup', userController.signUp)
// routes.put('/users', userController.put)
// routes.delete('/users', userController.delete)

//Receipt route MCV
routes.get('/receipt/:id', receiptController.get)
routes.post('/receipt/:id', receiptController.post)
routes.put('/receipt/:id', receiptController.put)
routes.delete('/receipt/:id', receiptController.delete)
routes.post('/receiptSubmit/', formidableMiddleware, receiptController.submit)
routes.get('/receipt/sevenDays/:id', receiptController.getSevenDay)
routes.get('/receipt/monthly/:id', receiptController.getMonthly)

routes.get('/stock/:id', stockController.get)
routes.post('/stock/:id', stockController.post)
routes.delete('/stock', stockController.delete)

routes.get('/account/:id', userController.get)
// // routes.post('/account/:id', userController.post)
routes.use(express.static(path.join(__dirname, '..', 'public')))
routes.use(express.static(path.join(__dirname, '..', 'node_modules')))
routes.use(
	isLoggedInStatic,
	express.static(path.join(__dirname, '..', 'private'))
)
routes.use((req, res) => {
	res.sendFile(path.join(__dirname, '..', 'public', '404.html'))
})
