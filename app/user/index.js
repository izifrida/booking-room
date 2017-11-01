const express = require('express');
const router = express.Router();
const create = require('./methods/create');
const userSchema = require('./user-schema.js');

router.post('/', create);

module.exports = router;
