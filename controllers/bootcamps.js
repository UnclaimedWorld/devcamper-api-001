const Bootcamps = require('../models/Bootcamps');
const ErrorResponse = require('../utils/error-response');
const asyncHandler = require('../middleware/async-handler');

// @description  Get all bootcamps
// @route        GET /api/v1/bootcamps
// @access       Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const data = await Bootcamps.find();

  res.status(200).json({ success: true, data, count: data.length });
});

// @description  Get single bootcamp
// @route        GET /api/v1/bootcamp/:id
// @access       Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const data = await Bootcamps.findById(req.params.id);

  if(!data) {
    throw new Error('cant find bootcamp with such id');
  }

  res.status(200).json({ success: true, data });
});

// @description  Create new bootcamp
// @route        POST /api/v1/bootcamps
// @access       Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const data = await Bootcamps.create(req.body);
  res.status(201).json({ success: true, data });
});

// @description  Update single bootcamp
// @route        PUT /api/v1/bootcamps/:id
// @access       Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const data = await Bootcamps.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if(!data) {
    throw new Error('cant find bootcamp with such id');
  }

  res.status(200).json({ success: true, data });
});

// @description  Delete single bootcamp
// @route        DELETE /api/v1/bootcamps/:id
// @access       Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const data = await Bootcamps.findByIdAndDelete(req.params.id);

  if(!data) {
    throw new Error('cant find bootcamp with such id');
  }

  res.status(200).json({ success: true, data: {} });
});

