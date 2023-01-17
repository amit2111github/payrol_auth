var express = require("express");
var router = express.Router();
const { createCompany, getCompany } = require("../controllers/company");
const { createUser } = require("../controllers/user");
const { createAddress } = require("../controllers/address");

router.post("/create", createCompany);
router.get("/get/:name", getCompany);

module.exports = router;
