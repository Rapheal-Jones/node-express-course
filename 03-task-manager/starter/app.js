//package import
const express = require('express')
require('dotenv').config()

//object import
const tasks = require('./routes/routes')
const connectDb = require('./db/connect')
const notFound = require('./middleware/notFound')
const customErrorHandler = require('./middleware/errorHandler')

//variables set
const port = process.env.PORT || 3000;
const app = express()

//middleware defined
app.use(express.static('./public'))
app.use(express.json())

//routes

app.use('/api/v1/tasks', tasks);

//default routes override
app.use(notFound)
app.use(customErrorHandler)

//server start and  db connection
const start = async () => {
    try {
        await connectDb(process.env.MONGO_DB_URI);
        app.listen(port, console.log(`Server started at ${port}..., Press Ctrl+c to stop...`));
    } catch (error) {
        console.log(error)
    }
}
start();

