const { login, randomFunc } = require('../controllers/main')
const authMiddleware = require('../middleware/auth')
const express = require('express')
const router = express.Router()


router.route('/login').post(login)
router.route('/dashboard').get(authMiddleware, randomFunc)

module.exports = router
