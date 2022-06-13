const UnauthenticatedError = require('./unauthenticated')
const CustomAPIError = require('./custom-error')
const BadRequestError = require('./badRequest')

module.exports = {
    CustomAPIError,
    BadRequestError,
    UnauthenticatedError,
}