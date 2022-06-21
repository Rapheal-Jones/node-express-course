const mongoose = require('mongoose')


const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Company name must be provided'],
        maxLength: 50,
    },
    position: {
        type: String,
        maxLength: 100,
    },
    status: {
        type: String,
        enum: ['interviewed', 'pending', 'verified'],
        default: 'pending',
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
        required: [true, 'User must be provided for the job'],
    },
}, { timestamps: true })



module.exports = mongoose.model('Jobs', JobSchema)








