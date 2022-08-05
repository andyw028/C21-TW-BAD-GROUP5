import express from 'express'
import { userController, receiptController } from '../server'

export const routes = express.Router()

routes.get('/', (req, res) => {
  res.sendFile('index.html')
})

//Users route
routes.get('/users', userController.get)
routes.post('/users', userController.post)
routes.put('/users', userController.put)
routes.delete('/users', userController.delete)

//Receipt route
routes.get('/receipt', userController.get)
routes.post('/receipt', userController.post)
routes.put('/receipt', userController.put)
routes.delete('/receipt', userController.delete)
