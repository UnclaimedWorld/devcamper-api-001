const Courses = require('../models/Courses');
const asyncHandler = require('../middleware/async-handler');
const Bootcamps = require('../models/Bootcamps');

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

// @description  Get single courses
// @route        GET /api/v1/course/:id
// @access       Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Courses.findById(req.params.id);
  if(!course) {
    throw new Error('cant find course with id ' + req.params.id);
  }

  res.status(200).json({ success: true, data: course });
});

// @description  Create new course
// @route        GET /api/v1/bootcamps/:bootcampId/courses
// @access       Private
exports.createCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  const bootcamp = await Bootcamps.findById(req.params.bootcampId);
  if(!bootcamp) {
    throw new Error('cant find course with id ' + req.params.bootcampId);
  }

  const course = await Courses.create(req.body);

  res.status(201).json({ success: true, data: course });
});

// @description  Update course
// @route        PUT /api/v1/course/:id
// @access       Private
exports.updateCourse = asyncHandler(async (req, res, next) => {

  let course = await Courses.findById(req.params.id);

  if(!course) {
    throw new Error('cant find course with id ' + req.params.id);
  }

  course = await Courses.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(201).json({ success: true, data: course });
});

// @description  Delete course
// @route        DELETE /api/v1/course/:id
// @access       Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  let course = await Courses.findById(req.params.id);

  if(!course) {
    throw new Error('cant find course with id ' + req.params.id);
  }

  course.remove();

  res.status(201).json({ success: true, data: {} });
});