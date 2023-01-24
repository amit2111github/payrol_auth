var express = require("express");
const { createLeave, getAllLeaveType } = require("../controllers/leave");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/user");

var router = express.Router();

router.post("/allotment", isSignedIn, isAuthenticated, isAdmin, createLeave);
router.post("/get/leave-type", isSignedIn, isAuthenticated, getAllLeaveType);
module.exports = router;
