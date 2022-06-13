require('dotenv').config()
const jwt = require('jsonwebtoken')
const { BadRequestError } = require('../errors')

const login = async (req, res) => {
    const { username, password } = req.body
    const id = new Date().getTime()

    if (!username || !password) {
        throw new BadRequestError('Username or Password is not provided')
    }

    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' })

    res.status(200).json({ msg: 'User Created', token })
}

const randomFunc = async (req, res) => {

    res.status(200).json({
        id: `${req.user.id}`,
        msg: `Hey ${req.user.username}`,
        secret: `Your Lucky Number for the day is:${Math.floor(Math.random() * 100)}`
    })
}

module.exports = {
    login,
    randomFunc,
}





