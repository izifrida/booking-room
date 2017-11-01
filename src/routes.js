//var user = require('./controllers/users.js');
//const local = require('../config/passport/local');
//const passport = require('passport');
const express = require('express');
const app = express.app;
const models = {};
const apiRouter = express.Router();
const router = express.Router();

// models ============================================================

apiRouter.use('/api', router);


router.use('/users', require('./user'));

/*
// Sign In //
router.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    console.log('here');
    return res.json(req.user);
  });
*/


module.exports = apiRouter;