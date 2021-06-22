const dotenv = require('dotenv');
const colors = require('colors');
const fs = require('fs');
const mongoose = require('mongoose');

dotenv.config({ path: './configs/config.env' });

const Bootcamps = require('./models/Bootcamps');

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));

async function importBootcamps() {
  try {
    await Bootcamps.create(bootcamps);
    console.log('Bootcamps imported'.green.inverse);
    process.exit();
  } catch(e) {
    console.error(e);
  }
}

async function deleteBootcamps() {
  try {
    await Bootcamps.deleteMany();
    console.log('Bootcamps destroyed'.red.inverse);
    process.exit();
  } catch(e) {
    console.error(e);
  }
}

if(process.argv[2] === '-i') {
  importBootcamps();
} else if(process.argv[2] === '-d') {
  deleteBootcamps();
}