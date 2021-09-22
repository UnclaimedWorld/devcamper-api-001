const Courses = require('../models/Courses');
const asyncHandler = require('../middleware/async-handler');

// @description  Get courses
// @route        GET /api/v1/courses
// @route        GET /api/v1/bootcamps/:bootcampId/courses
// @access       Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if(req.params.bootcampId) {
    query = Courses.find({bootcamp: req.params.bootcampId})
  } else {
    query = Courses.find().populate({
      path: 'bootcamp',
      select: 'name description'
    });
  }

  const courses = await query;

  res.status(200).json({ success: true, count: courses.length, data: courses });
});