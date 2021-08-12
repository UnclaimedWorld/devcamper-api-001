const Bootcamps = require('../models/Bootcamps');
const asyncHandler = require('../middleware/async-handler');
const geocoder = require('../utils/geocoder');

// @description  Get all bootcamps
// @route        GET /api/v1/bootcamps
// @access       Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;

  let reqQuery = {...req.query};

  const removeFields = ['select', 'sort', 'page', 'limit'];
  removeFields.forEach(field => delete reqQuery[field]);

  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(/\b(lt|lte|gt|gte|in)\b/g, match => `$${match}`);
  query = Bootcamps.find(JSON.parse(queryStr));

  // select only requested fields
  if(req.query.select) {
    query.select(req.query.select.split(',').join(' '));
  }
  // sort data
  if(req.query.sort) {
    query.sort(req.query.sort.split(',').join(' '));
  } else {
    query.sort('-createdAt');
  }
  // pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 1;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Bootcamps.countDocuments();
  query.skip(startIndex).limit(limit);

  const data = await query;

  const pagination = {};

  if(endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }
  if(startIndex > 0) {
    pagination.previous = {
      page: page - 1,
      limit
    }
  }

  res.status(200).json({ success: true, count: data.length, pagination, data });
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
