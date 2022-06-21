const model = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {

    const user = await model.create({ ...req.body })

    const username = user.getName()
    const token = user.getToken()

    res.status(StatusCodes.CREATED).json({ user: `${username}`, token: `${token}` })
}


const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new BadRequestError(" Email or Password empty")
    }

    const user = await model.findOne({ email })

    if (!user) {
        throw new UnauthenticatedError("No user found")
    }

    const passwordMatched = await user.matchPassword(password)

    if (!passwordMatched) {
        throw new UnauthenticatedError("Please provide correct password")
    }

    const token = user.getToken()

    res
        .status(StatusCodes.CREATED)
        .json({ id: `${req.user.id}`, user: `${req.user.username}`, token: `${token}` })
}


module.exports = {
    login,
    register,
}
