import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import db from './db.js'
import QuotesController from './quotes/QuotesController.js'
import Joi from 'joi';
import cors from 'cors'

dotenv.config()
const opt = {debug: true}

const PORT = process.env.PORT || 3001
const app = express()
app.listen(PORT, () => {console.log(`listening on ${PORT}`)})
app.use(cors())

app.get('/', (req, res ) => res.send('Hello World'))
app.get('/api', (req, res ) => res.send('Hello from api endpoint'))
app.use('/api/quotes', QuotesController)

