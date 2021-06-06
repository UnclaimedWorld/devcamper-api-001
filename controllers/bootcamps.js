const Bootcamps = require('../models/Bootcamps');

// @description  Get all bootcamps
// @route        GET /api/v1/bootcamps
// @access       Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const data = await Bootcamps.find();

    res.status(200).json({ success: true, data, count: data.length });
  } catch(e) {
    res.status(400).json({
      success: false,
      message: e.message
    })
  }
};

// @description  Get single bootcamp
// @route        GET /api/v1/bootcamp/:id
// @access       Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const data = await Bootcamps.findById(req.params.id);

    if(!data) {
      throw new Error('cant find bootcamp with such id');
    }

    res.status(200).json({ success: true, data });
  } catch(e) {
    res.status(400).json({
      success: false,
      message: e.message
    })
  }
};

// @description  Create new bootcamp
// @route        POST /api/v1/bootcamps
// @access       Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const data = await Bootcamps.create(req.body);
    res.status(201).json({ success: true, data });
  } catch(e) {
    res.status(400).json({
      success: false,
      message: e.message
    })
  }
};

// @description  Update single bootcamp
// @route        PUT /api/v1/bootcamps/:id
// @access       Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const data = await Bootcamps.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if(!data) {
      throw new Error('cant find bootcamp with such id');
    }

    res.status(200).json({ success: true, data });
  } catch(e) {
    res.status(400).json({
      success: false,
      message: e.message
    })
  }
};

// @description  Delete single bootcamp
// @route        DELETE /api/v1/bootcamps/:id
// @access       Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const data = await Bootcamps.findByIdAndDelete(req.params.id);

    if(!data) {
      throw new Error('cant find bootcamp with such id');
    }

    res.status(200).json({ success: true, data: {} });
  } catch(e) {
    res.status(400).json({
      success: false,
      message: e.message
    })
  }
};

