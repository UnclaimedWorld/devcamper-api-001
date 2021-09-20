const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const db = require('./configs/mongodb');
const colors = require('colors');
const errorHandler = require('./middleware/error-handler');

dotenv.config({ path: './configs/config.env' });

db();

const PORT = process.env.PORT || 5000;
const app = express();

const bootcampsRouter = require('./routes/bootcamps');
const coursesRouter = require('./routes/courses');

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1/bootcamps', bootcampsRouter);
app.use('/api/v1/courses', coursesRouter);
app.use(errorHandler);

const server = app.listen(PORT, console.log(`Application is running in ${process.env.NODE_ENV} mode and on ${PORT} port`.blue.bold));
process.on('unhandledRejection', (err, promise) => {
  console.log(`Unhandled promise rejection ${err.message}`.red.bold);
  server.close(() => {
    process.exit(1);
  });
})