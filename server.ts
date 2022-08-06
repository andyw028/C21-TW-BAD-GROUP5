import express from 'express'
import { client } from './tools/pg'
import { knex } from './tools/knexConfig'
import expressSession from 'express-session'
import path from 'path'

client.connect()

const app = express()

//Session
app.use(
	expressSession({
		secret: 'FBqvkCC09f',
		resave: true,
		saveUninitialized: true
	})
)
//###################################
//Controller and Services Declaration
//###################################
import { UserController } from './controllers/userController'
import { ReceiptController } from './controllers/receiptController'
import { UserServices } from './services/userServices'
import { ReceiptServices } from './services/receiptServices'

const userServices = new UserServices(knex)
const receiptServices = new ReceiptServices(knex)
export const userController = new UserController(userServices)
export const receiptController = new ReceiptController(receiptServices)

//########################
//Routes
//########################
import { routes } from './routers/routers'
app.use('/', routes)

//########################
//Static Files
//########################
app.use(express.static(path.join(__dirname, 'public')))
app.use((req, res) => {
	res.sendFile(path.join(__dirname, 'public', '404.html'))
})

//########################
//Routes Listening
//########################
const PORT = 8080
app.listen(PORT, () => {
	console.log(`listening on ${PORT}`)
})
