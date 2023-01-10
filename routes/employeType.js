var express = require('express');
const {
  createEmployeeType,
  getEmployeeType,
} = require('../controllers/employeType');
var router = express.Router();
const { isAdmin, isAuthenticated, isSignedIn } = require('../controllers/user');

router.post(
  '/create',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createEmployeeType
);
router.post('/getAll', isSignedIn, isAuthenticated, getEmployeeType);

module.exports = router;
