"use strict";

const express = require('express');
const app = express.app;
const apiRouter = express.Router();
const router = express.Router();
const auth = require('../config/middleware/authorization');

apiRouter.use('/api', router);

router.use('/users', auth.isAuthorized, require('./user'));
router.use('/auth', require('./auth'));

module.exports = apiRouter;