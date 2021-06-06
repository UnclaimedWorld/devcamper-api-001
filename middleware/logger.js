const logger = (req, res, next) => {
  req.hello = 'Hello world';
  console.log('middleware ran');
  next();
}

module.exports = logger;