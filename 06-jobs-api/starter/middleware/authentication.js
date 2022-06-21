const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = async (req, res, next) => {

    const headers = req.headers.authorization

    if (!headers || !headers.startsWith('Bearer ')) {
        throw new UnauthenticatedError("Authorization Failed")
    }

    const token = headers.split(' ')[1]

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { username: user.userName, id: user.id }
        next()
    } catch (error) {
        throw new UnauthenticatedError("Authorization Failed")
    }
}


module.exports = auth
