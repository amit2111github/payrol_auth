var express = require("express");
var router = express.Router();
const { createCompany } = require("../controllers/company");
const { createUser } = require("../controllers/user");
const { createAddress } = require("../controllers/address");

router.post("/create", createCompany);

module.exports = router;
