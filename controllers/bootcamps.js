const Bootcamps = require('../models/Bootcamps');
const asyncHandler = require('../middleware/async-handler');
const geocoder = require('../utils/geocoder');

// @description  Get all bootcamps
// @route        GET /api/v1/bootcamps
// @access       Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;
  let queryStr = JSON.stringify(req.query);
  queryStr = queryStr.replace(/\b(lt|lte|gt|gte|in)\b/g, match => `$${match}`);
  query = JSON.parse(queryStr);

  const data = await Bootcamps.find(query);

  res.status(200).json({ success: true, count: data.length, data });
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
    throw new Error('cant find bootcamp with id ' + req.params.id);
  }

  res.status(200).json({ success: true, data });
});

// @description  Delete single bootcamp
// @route        DELETE /api/v1/bootcamps/:id
// @access       Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const data = await Bootcamps.findByIdAndDelete(req.params.id);

  if(!data) {
    throw new Error('cant find bootcamp with id ' + req.params.id);
  }

  res.status(200).json({ success: true, data: {} });
});

// @description  Get bootcamps within radius
// @route        GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access       Public
exports.getBootcampsWithinRadius = asyncHandler(async (req, res, next) => {
  const {zipcode, distance} = req.params;

  // radius = distance / earth radius
  // earth radius = 6371
  const radius = distance / 6371;

  const location = await geocoder.geocode(zipcode);
  const lng = location[0].longitude;
  const lat = location[0].latitude;

  const bootcamps = await Bootcamps.find({
    location: {
      $geoWithin: {
        $centerSphere: [ [lng, lat], radius ]
      }
    }
  });

  res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps });
});
