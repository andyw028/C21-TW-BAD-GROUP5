import express from 'express'
import { userController, receiptController } from '../server'
import path from 'path'

export const routes = express.Router()

routes.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

routes.get('/login', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'public', 'login.html'))
})

//Users route
routes.get('/users', userController.get)
routes.post('/users', userController.post)
routes.put('/users', userController.put)
routes.delete('/users', userController.delete)

//Receipt route
routes.get('/receipt', receiptController.get)
routes.post('/receipt', receiptController.post)
routes.put('/receipt', receiptController.put)
routes.delete('/receipt', receiptController.delete)

routes.use(express.static(path.join(__dirname, '..', 'public')))
