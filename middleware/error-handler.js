const ErrorResponse = require('../utils/error-response');

const errorHandler = (err, req, res, next) => {
  console.log(err.stack.red);

  let error = {...err};

  error.message = err.message;

  if(err.name === 'CastError') {
    const message = `Resource with id ${err.value} not found`;
    error = new ErrorResponse(message, 404);
  }
  if(err.code === 11000) {
    const message = `Duplicate resources id ${err.value}`;
    error = new ErrorResponse(message, 400);
  }
  if(err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(error => error.message).join(',');
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server error'
  });
}

module.exports = errorHandler;