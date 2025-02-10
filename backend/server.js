const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const ticketRoutes = require('./routes/ticketRoutes')
const cors = require('cors')
const PORT = process.env.PORT || 5000

//Connect to database

connectDB()

const app = express()

app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (_req, res) => {
    res.status(200).json({message:'Welcome to the Support Desk API'})
})

//Routes
app.use('/api/users', userRoutes)
app.use('/api/tickets', ticketRoutes)

app.use(errorHandler)

app.listen(PORT, () => console.log(`server start on port ${PORT}`))