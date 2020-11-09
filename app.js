import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import InitiateMongo from './db.js'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import quotesRoutes from './routes/quotes'
import userRoutes from './routes/users'

dotenv.config()
const opt = { debug: true }

// Initiate Mongo
InitiateMongo()

const PORT = process.env.PORT || 3333

// setting up auth

const app = express()
app.use(helmet())

// using bodyParser to parse JSON bodies into JS objects
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// enabling CORS for all requests
app.use(cors())

// adding morgan to log HTTP requests
app.use(morgan('combined'))

app.get('/', (req, res) => res.send('Hello World'))
app.get('/api', (req, res) => res.send('Hello from api endpoint'))
app.use('/api/quotes', quotesRoutes)
app.use('/api/user', userRoutes)

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})
