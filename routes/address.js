const express = require('express');
const { createAddress, updateAddress } = require('../controllers/address');
const { isAdmin, isSignedIn, isAuthenticated } = require('../controllers/user');
const router = express.Router();

router.post('/create', isSignedIn, isAuthenticated, isAdmin, createAddress);
router.post('/update', isSignedIn, isAuthenticated, updateAddress);

module.exports = router;
