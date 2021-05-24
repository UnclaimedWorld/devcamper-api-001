const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ success: true, msg: `get all bootcamps` });
});
router.get('/:id', (req, res) => {
  res.status(200).json({ success: true, msg: `get bootcamp with id ${req.params.id}` });
});
router.post('/', (req, res) => {
  res.status(200).json({ success: true, msg: `create new bootcamp` });
});
router.put('/:id', (req, res) => {
  res.status(200).json({ success: true, msg: `replace bootcamp with id ${req.params.id}` });
});
router.delete('/:id', (req, res) => {
  res.status(200).json({ success: true, msg: `delete bootcamp with id ${req.params.id}` });
});

module.exports = router;