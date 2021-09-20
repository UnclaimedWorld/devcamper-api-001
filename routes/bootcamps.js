const express = require('express');
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsWithinRadius
} = require('../controllers/bootcamps');
const CoursesRouter = require('./courses');

const router = express.Router();

router.use('/:bootcampId/courses', CoursesRouter);

router.route('/radius/:zipcode/:distance')
  .get(getBootcampsWithinRadius);
router.route('/')
  .get(getBootcamps)
  .post(createBootcamp);
router.route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;