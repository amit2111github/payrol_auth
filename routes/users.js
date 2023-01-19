const express = require("express");
const router = express.Router();
const {
  signin,
  getCompanyUrl,
  crateOneEmployee,
  crateEmployeeFromCSV,
  isSignedIn,
  isAuthenticated,
  isAdmin,
  changeDepartment,
  changePassword,
  forgotPasswordS1,
  forgotPasswordS2,
  forgotPasswordS3,
  changeProfilePhoto,
  getAllEmployee,
  getManager,
} = require("../controllers/user");

router.post("/signin", signin);

router.get("/get-company-url/:user_code", getCompanyUrl);

router.post(
  "/get/allEmployee",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllEmployee
);
router.post(
  "/create/employee1",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  crateOneEmployee
);
router.post(
  "/create/employeeM",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  crateEmployeeFromCSV
);
router.post(
  "/change-depatment",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  changeDepartment
);
router.post("/getManager", isSignedIn, isAuthenticated, getManager);
router.post("/password/forgot/s1", forgotPasswordS1);
router.post("/password/forgot/s2", forgotPasswordS2, forgotPasswordS3);
router.post("/password/change", isSignedIn, isAuthenticated, changePassword);
router.put("/profile/photo", isSignedIn, isAuthenticated, changeProfilePhoto);

module.exports = router;
