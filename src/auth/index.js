"use strict";

const express = require('express');
const router = express.Router();

router.post('/sign-in', require('./methods/sign-in'));
router.get('/sign-out', require('./methods/sign-out'));
router.post('/register', require('./methods/register'));

module.exports = router;
