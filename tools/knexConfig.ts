import Knex from 'knex'
import dotenv from 'dotenv'

dotenv.config()

import knexConfigs from '../knexfile'
const mode = 'development' || process.env.NODE_ENV
const knexConfig = knexConfigs[mode]
export const knex = Knex(knexConfig)
