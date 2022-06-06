require('dotenv').config()

const dbConnection = require('./db/connect')
const Product = require('./models/product')
const json = require('./products.json')



const start = async () => {
    try {
        await dbConnection(process.env.MONGO_DB_URL)
        await Product.deleteMany()
        await Product.create(json)
        await Product.find({}, (err, docs) => {
            console.log('No of Records inserted: ' + docs.length)
        })

        console.log('Success !!!')
        process.exit()
    } catch (err) {
        console.log(err)
    }
}
start();


