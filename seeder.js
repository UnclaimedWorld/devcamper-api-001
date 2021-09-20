const dotenv = require('dotenv');
const colors = require('colors');
const fs = require('fs');
const mongoose = require('mongoose');

dotenv.config({ path: './configs/config.env' });

const Bootcamps = require('./models/Bootcamps');
const Courses = require('./models/Courses');

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'));

async function importData() {
  try {
    await Bootcamps.create(bootcamps);
    await Courses.create(courses);
    console.log('Data imported'.green.inverse);
    process.exit();
  } catch(e) {
    console.error(e);
  }
}

async function deleteData() {
  try {
    await Bootcamps.deleteMany();
    await Courses.deleteMany();
    console.log('Data destroyed'.red.inverse);
    process.exit();
  } catch(e) {
    console.error(e);
  }
}

if(process.argv[2] === '-i') {
  importData();
} else if(process.argv[2] === '-d') {
  deleteData();
}