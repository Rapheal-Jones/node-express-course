const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [5, 'Name must be greater than 5 chars'],
        maxLength: [50, 'Name must not be greater than 50 chars'],
        required: [true, 'Name must be provided']
    },
    email: {
        type: String,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please check email format'],
        unique: [true, 'Email id must be unique'],
        required: [true, 'Email must be provided']
    },
    password: {
        type: String,
        minLength: [5, 'Password must be greater than 5 chars'],
        maxLength: [21, 'Password must not be greater than 21 chars'],
        required: [true, 'Password must be provided']
    }
})

UserSchema.pre('save', async function (next) {

    const salt = await bcrypt.genSalt(10)

    this.password = await bcrypt.hash(this.password, salt)

    next()
})


UserSchema.methods.getName = function () {
    return this.name
}

UserSchema.methods.getToken = function () {

    return jwt.sign({ id: this._id, userName: this.name, emailAddress: this.email },
        process.env.JWT_SECRET, { "expiresIn": process.env.JWT_LIFETIME })

}

UserSchema.methods.matchPassword = async function (passwordProvided) {
    const isMatched = await bcrypt.compare(passwordProvided, this.password)
    return isMatched
}

module.exports = mongoose.model('Users', UserSchema)






