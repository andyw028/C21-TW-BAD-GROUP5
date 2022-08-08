import express from 'express'
import { userController, receiptController, stockController } from '../server'
import path from 'path'

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
routes.get('/register', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'public', 'register.html'))
})

//Users route MCV
routes.get('/login', userController.login)
routes.post('/signup', userController.signup)
// routes.put('/users', userController.put)
// routes.delete('/users', userController.delete)

//Receipt route MCV
routes.get('/receipt', receiptController.get)
routes.post('/receipt', receiptController.post)
routes.put('/receipt', receiptController.put)
routes.delete('/receipt', receiptController.delete)

routes.get('/stock/:id', stockController.get)
routes.post('/stock', stockController.post)
routes.delete('/stock', stockController.delete)

routes.use(express.static(path.join(__dirname, '..', 'public')))
routes.use(express.static(path.join(__dirname, '..', 'private')))
