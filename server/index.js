require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const connect = require('./config/db')
const userRoute = require('./router/userRoute')

const app = express()
connect()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/user', userRoute)

PORT = process.env.PORT || PORT

app.listen(PORT, console.log(`Server connected to port ${PORT}`))