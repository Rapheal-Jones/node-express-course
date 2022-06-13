const jwt = require('jsonwebtoken')
require('dotenv').config()
const { UnauthenticatedError } = require('../errors')

const authMiddleware = (req, res, next) => {
    const authToken = req.headers.authorization

    if (!authToken || !authToken.startsWith('Bearer')) {
        throw new UnauthenticatedError('Some Authorization error occurred')
    }

    try {
        const token = jwt.verify(authToken.split(' ')[1].trim(), process.env.JWT_SECRET)
        const { id, username } = token
        req.user = { id, username }
        next()
    } catch (error) {
        console.log(error)
        throw new UnauthenticatedError('Not Authorized')
    }

}

module.exports = authMiddleware
