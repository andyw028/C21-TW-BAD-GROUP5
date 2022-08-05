import express from 'express'
import { client } from './tools/pg'
import { knex } from './tools/knexConfig'

client.connect()

const app = express()

//Controller and Services Declaration
import { UserController } from './controllers/userController'
import { ReceiptController } from './controllers/receiptController'
import { UserServices } from './services/userServices'
import { ReceiptServices } from './services/receiptServices'

const userServices = new UserServices(knex)
const receiptServices = new ReceiptServices(knex)
export const userController = new UserController(userServices)
export const receiptController = new ReceiptController(receiptServices)

//use the router's routes
import { routes } from './routers/routers'
app.use('/', routes)

const PORT = 8080
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})
