import pg from 'pg'
import dotenv from 'dotenv'
dotenv.config()

export const client = new pg.Client({
	host: process.env.POSTGRES_HOST,
	database: process.env.POSTGRES_DB_NAME,
	user: process.env.POSTGRES_DB_USERNAME,
	password: process.env.POSTGRES_DB_PASSWORD
})
