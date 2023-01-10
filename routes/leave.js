var express = require('express');
const { createLeave } = require('../controllers/leave');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/user');

var router = express.Router();

router.post('/allotment', isSignedIn, isAuthenticated, isAdmin, createLeave);
module.exports = router;
