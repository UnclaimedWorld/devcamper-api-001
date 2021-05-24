const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './configs/config.env' });

const PORT = process.env.PORT || 5000;
const app = express();

const router = require('./routes/bootcamps-routes');

app.use('/api/v1/bootcamps', router);

app.listen(PORT, console.log(`Application is running in ${process.env.NODE_ENV} mode and on ${PORT} port`));