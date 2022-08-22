import express from 'express'
import { knex } from './tools/knexConfig'
import expressSession from 'express-session'
import path from 'path'
import fs from 'fs'
import formidable from 'formidable'

const app = express()

//parse json
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Session
app.use(
	expressSession({
		secret: 'FBqvkCC09f',
		resave: true,
		saveUninitialized: true
	})
)

//file upload route
const uploadDir = 'uploads'
fs.mkdirSync(uploadDir, { recursive: true })
app.use(express.static(path.join(__dirname, 'uploads')))

export const form = formidable({
	uploadDir,
	keepExtensions: true,
	maxFiles: 1,
	maxFileSize: 500 * 1024 * 1024, // the default limit is 500MB
	filter: (part) => part.mimetype?.startsWith('image/') || false,
	filename: (originalName, originalExt, part, form) => {
		let fieldName = part.name
		return `${fieldName}`
	}
})

//###################################
//Controller and Services Declaration
//###################################
import { UserController } from './controllers/userController'
import { ReceiptController } from './controllers/receiptController'
import { StockController } from './controllers/stockController'
import { UserServices } from './services/userServices'
import { ReceiptServices } from './services/receiptServices'
import { StockServices } from './services/stockServices'
const userServices = new UserServices(knex)
const receiptServices = new ReceiptServices(knex)
const stockService = new StockServices(knex)
export const userController = new UserController(userServices)
export const receiptController = new ReceiptController(receiptServices)
export const stockController = new StockController(stockService)
//########################
//Routes
//########################
import { routes } from './routers/routers'
import { isLoggedInStatic } from './utils/guards'
import { logger } from './tools/winston'
import { errorHandler } from './utils/error'
app.use('/', routes)

//########################
//Static Files
//########################
app.use(express.static(path.join(__dirname, 'public')))
app.use(isLoggedInStatic, express.static(path.join(__dirname, 'private')))
app.use((req, res) => {
	res.sendFile(path.join(__dirname, 'public', '404.html'))
})

app.use(errorHandler)

//########################
//Routes Listening
//########################
const PORT = 8080
app.listen(PORT, () => {
	logger.info(`Listening To Port ${PORT} `)
})
