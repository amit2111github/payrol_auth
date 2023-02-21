var express = require("express");
var router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/user");
const {
	createCompany,
	getCompany,
	changeLogo,
} = require("../controllers/company");
const { createUser } = require("../controllers/user");
const { createAddress } = require("../controllers/address");

router.post("/create", createCompany);
router.put("/change/logo", isSignedIn, isAuthenticated, isAdmin, changeLogo);
router.get("/get/:name", getCompany);

module.exports = router;
