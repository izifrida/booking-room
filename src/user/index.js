const express = require('express');
const router = express.Router();

router.post('/', require('./methods/create'));

module.exports = router;
