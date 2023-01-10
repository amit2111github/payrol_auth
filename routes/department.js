const express = require('express');
const {
  createDepartment,
  getAllDepartment,
  getAllUser,
  changeManager,
} = require('../controllers/department');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/user');
const router = express.Router();

router.post('/all', isSignedIn, isAuthenticated, getAllDepartment);
router.post('/create', isSignedIn, isAuthenticated, isAdmin, createDepartment);
router.post(
  '/changemanager',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  changeManager
);

router.post('/user', isSignedIn, isAuthenticated, getAllUser); // all user of a particular department;

module.exports = router;
