const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product Name must be provided'],
        maxLength: [50, 'Product name should not exceed 50 characters']
    },
    price: {
        type: Number,
        required: [true, 'Product price should be provided']
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'caressa', 'liddy', 'marcos'],
            message: '{VALUE} cannot be added as company'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

})



module.exports = mongoose.model('Products', productSchema)

