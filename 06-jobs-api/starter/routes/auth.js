

const express = require('express')
const router = express.Router()

const authorization = require('../middleware/authentication')
const { login, register } = require('../controllers/auth')

router.route('/login').post(authorization, login)
router.route('/register').post(register)

module.exports = router