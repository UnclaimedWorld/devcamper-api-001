const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const db = require('./configs/mongodb');
const colors = require('colors');

dotenv.config({ path: './configs/config.env' });

db();

const PORT = process.env.PORT || 5000;
const app = express();

const router = require('./routes/bootcamps-routes');

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1/bootcamps', router);

const server = app.listen(PORT, console.log(`Application is running in ${process.env.NODE_ENV} mode and on ${PORT} port`.blue.bold));
process.on('unhandledRejection', (err, promise) => {
  console.log(`Unhandled promise rejection ${err.message}`.red.bold);
  server.close(() => {
    process.exit(1);
  });
})