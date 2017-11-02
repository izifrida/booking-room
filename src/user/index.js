"use strict";

const express = require('express');
const router = express.Router();

router.put('/', require('./methods/update'));
router.get('/', require('./methods/users-list'));

module.exports = router;
