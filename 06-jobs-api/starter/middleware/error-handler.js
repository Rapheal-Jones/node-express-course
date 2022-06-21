const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {

  errorMessage = err.message || 'Something went wrong, Please try again later'
  errorStatus = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR

  if (err.code && err.code === 11000) {
    errorMessage = `Duplication error:${Object.keys(err.keyValue)}`
    errorStatus = StatusCodes.BAD_REQUEST
  }

  if (err.name === 'ValidationError') {
    errorMessage = Object.values(err.errors).map((item) => item.message).join(' & ')
    errorStatus = StatusCodes.BAD_REQUEST
  }
  else if (err.name === 'CastError') {
    errorMessage = `No id like: ${err.value}`
    errorStatus = StatusCodes.NOT_FOUND
  }

  return res.status(errorStatus).json({ errorMessage })

}

module.exports = errorHandlerMiddleware
