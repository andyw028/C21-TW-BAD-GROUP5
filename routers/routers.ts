import express from 'express'
import { userController, receiptController } from '../server'
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

// testing, need to delete later
routes.get('/testing', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'private', 'dashboard.html'))
})


//Users route MCV
routes.get('/users', userController.get)
routes.post('/users', userController.post)
routes.put('/users', userController.put)
routes.delete('/users', userController.delete)

//Receipt route MCV
routes.get('/receipt/:id', receiptController.get)
routes.post('/receipt/:id', receiptController.post)
routes.put('/receipt/:id', receiptController.put)
routes.delete('/receipt/:id', receiptController.delete)

routes.use(express.static(path.join(__dirname, '..', 'public')))
