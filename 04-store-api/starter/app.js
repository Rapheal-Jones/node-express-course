//package import
require('dotenv').config()
require('express-async-errors')

//express imports
const express = require('express')

//objects import
const dbConnection = require('./db/connect')
const routeProduct = require('./routes/products')
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

//set variables
const port = process.env.PORT || 3000
const app = express()

//middleware
app.use(express.json())

//routes
app.use('/api/v1/products', routeProduct)

//default routes
app.use(notFound)
app.use(errorHandler)

//server
const start = async () => {
    try {
        await dbConnection(process.env.MONGO_DB_URL)
        app.listen(port, console.log(`Server started on port : ${port} , Press Ctrl+c to terminate session...`))
    } catch (err) {
        console.log(err)
    }
}
start();

