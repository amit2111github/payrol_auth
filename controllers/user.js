const db = require("../models/index.js");
const { models } = db.sequelize;
const { Company, User, Department, UserLeave, CompanyGrantedLeaves } = models;
const jwt = require("jsonwebtoken");
const { getRandomNumber } = require("./company");
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");
const Op = db.Sequelize.Op;
const {
  sendMailToUsers,
  sendMailForPasswordChange,
} = require("../services/mail/index.js");
const { get_encrypted_password } = require("../services/encryption/index");
const { secret } = require("../config/vars.js");
const { raw } = require("express");

exports.isSignedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, secret);
    req.user = user;
    // console.log(user);
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "You are not signed in.", code: 1 });
  }
};
exports.isAuthenticated = (req, res, next) => {
  try {
    const user =
      req.user &&
      req.user.id == req.body.id &&
      req.body.company_id == req.user.company_id;
    if (!user) {
      return res.status(400).json({ error: "Access Denied." });
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Authorization required." });
  }
};
exports.isAdmin = (req, res, next) => {
  try {
    const user = req.user;
    if (user.role !== "ADMIN") {
      return res.status(400).json({ error: "Admin permission required." });
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Authorization required." });
  }
};

exports.crateOneEmployee = async (req, res, next) => {
  try {
    const { company_id } = req.body;
    const plainPassword = getRandomNumber(6);
    await sequelize.transaction(async (t) => {
      const user = await User.create(
        {
          name: req.body.name,
          email: req.body.email,
          phone_number: req.body.phone_number,
          password: get_encrypted_password(plainPassword),
          gender: req.body.gender,
          company_id: req.body.company_id ? +req.body.company_id : null,
          role: req.body.role,
          employee_type: req.body.employee_type
            ? +req.body.employee_type
            : null,
          profile_picture: req.body.profile_picture,
          currently_working: true,
          joning_date: req.body.joning_date,
          department_id: req.body.department_id
            ? +req.body.department_id
            : null,
          tax_slab: req.body.tax_slab || "NEW",
          user_code: req.user.user_code.substring(0, 3) + getRandomNumber(5),
        },
        { transaction: t }
      );
      let data = await CompanyGrantedLeaves.findAll(
        { where: { company_id } },
        { transaction: t }
      );
      const date = new Date();
      data = data.map((leave) => ({
        user_id: user.id,
        leave_id: leave.leave_id,
        assigned: leave.days,
        from: date,
        to: new Date(date.getFullYear() + "-" + "12" + "-" + 31),
      }));
      await UserLeave.bulkCreate(data, { transaction: t });
      user.dataValues.password = plainPassword;
      const companyDetails = await Company.findOne({
        where: { id: company_id },
        raw: true,
      });
      sendMailToUsers([
        { ...user.dataValues, company_name: companyDetails.name },
      ]);
      return res.json({ status: 200, msg: "Employee creted successfully" });
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Failed to create Employee" });
  }
};

exports.crateEmployeeFromCSV = async (req, res) => {
  try {
    const file = req.files.myFile;
    const randomNumber = getRandomNumber(4);
    const dir = path.join(
      __dirname,
      "../",
      "./employee" + randomNumber + ".csv"
    );
    fs.writeFileSync(dir, file.data, (err) => {
      if (err)
        return res.json({
          error: "Something went wrong while reading csv file",
        });
    });

    let json = [];

    fs.createReadStream(dir)
      .on("error", (err) => {
        if (err)
          return res.json({
            error: "Something went wrong while reading csv file",
          });
      })
      .pipe(csv())
      .on("data", (row) => json.push(row))
      .on("end", async () => {
        fs.unlink(dir, (err) => console.log(err));
        json = json.map((user) => ({
          ...user,
          password: getRandomNumber(10),
          company_id: req.user.company_id,
        }));

        let clonedJson = json.map((user) => user);
        json = json.map((user) => ({
          ...user,
          password: get_encrypted_password(user.password),
          employee_type: user.employee_type ? +user.employee_type : null,
          department_id: user.department_id ? +user.department_id : null,
          user_code: req.user.user_code.substring(0, 3) + getRandomNumber(5),
        }));

        await sequelize.transaction(async (t) => {
          let users = await User.bulkCreate(json, { transaction: t });

          users = users.map((user) => user.dataValues);
          let data = await CompanyGrantedLeaves.findAll(
            { where: { company_id: req.user.company_id } },
            { transaction: t }
          );
          data = data.map((leave) => leave.dataValues);
          let leavesArray = [];
          const date = new Date();

          // creating leaves for all the user from csv file if theri company have any.
          users.forEach((user) => {
            data.forEach((leave) => {
              let obj = {
                user_id: user.id,
                leave_id: leave.leave_id,
                assigned: leave.days,
                from: date,
                to: new Date(date.getFullYear() + "-" + "12" + "-" + 31),
              };
              leavesArray.push(obj);
            });
          });
          await UserLeave.bulkCreate(leavesArray, { transaction: t });
        });
        const companyDetails = await Company.findOne({
          raw: true,
          where: { id: req.user.company_id },
        });
        clonedJson = clonedJson.map((user) => ({
          ...user,
          company_name: companyDetails.name,
        }));
        sendMailToUsers(clonedJson);
        return res.json({ msg: "All User created successfully" });
      });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Failed to create Employee" });
  }
};

exports.getAllEmployee = async (req, res) => {
  try {
    const { company_id, id } = req.body;
    const data = await User.findAll({
      where: { company_id, id: { [Op.ne]: id } },
    });
    return res.json(data);
  } catch (err) {
    console.log(err);
    return res.json({ error: "Faile to Fetch All Employees." });
  }
};

exports.signin = async (req, res) => {
  try {
    const { user_code, password } = req.body;
    let user = await User.findOne({ where: { user_code } });
    user = user.dataValues;
    if (!user) {
      return res.status(400).json({ error: "Wrong User Code." });
    }
    const encry = get_encrypted_password(password);
    if (user.password != encry) {
      return res.status(400).json({ error: "Wrong Password." });
    }
    const token = jwt.sign(
      {
        id: user.id,
        user_code: user_code,
        company_id: user.company_id,
        role: user.role,
      },
      secret,
      { expiresIn: "1h" }
    );
    return res.json({ token, user });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Failed to Login" });
  }
};

exports.getCompanyUrl = async (req, res) => {
  try {
    const { user_code } = req.params;
    const data = await User.findOne({
      where: { user_code },
      include: [
        {
          model: Company,
          as: "company",
          attributes: ["base_url"],
        },
      ],
      attributes: ["user_code", "company_id"],
    });
    return res.json({ url: data.company.base_url });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Fail to load company url" });
  }
};

exports.changeDepartment = async (req, res) => {
  try {
    const { user_id, department_id, company_id } = req.body;
    const departmentHeadeByCurrentUser = await Department.findOne({
      where: { managed_by: user_id, company_id },
    });
    // console.log(departmentHeadeByCurrentUser);
    await sequelize.transaction(async (t) => {
      await Department.update(
        { managed_by: null },
        {
          where: {
            id: departmentHeadeByCurrentUser?.id
              ? departmentHeadeByCurrentUser?.id
              : null,
            company_id,
          },
        },
        { transaction: t }
      );
      await User.update(
        { department_id, role: "EMPLOYEE" },
        { where: { id: user_id, company_id } },
        { transaction: t }
      );
    });
    return res.json({ msg: "Department chaned for " + user_id });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Fail to Changer department", err });
  }
};

exports.forgotPasswordS1 = async (req, res) => {
  try {
    const { user_code } = req.body;
    const user = await User.findOne({ raw: true, where: { user_code } });
    const otp = getRandomNumber(6);
    await User.update(
      { otp, otp_create_at: Date.now() },
      { where: { user_code } }
    );
    sendMailForPasswordChange({ email: user.email, name: user.name, otp });
    return res.json({
      msg: "Otp has been sent to your email id , Check you inbox ",
    });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Oops Something went wrong :(" });
  }
};
exports.forgotPasswordS2 = async (req, res, next) => {
  try {
    const { otp, user_code } = req.body;
    const user = await User.findOne({ raw: true, where: { user_code } });
    if (user.otp != otp) {
      return res.json({ error: "Wrong Otp" });
    }

    let otpExpired = Date.now() - +user.otp_create_at;

    if (otpExpired >= 5 * 60 * 1000)
      return res.json({ error: "Otp has been Expired" });
    next();
  } catch (err) {
    return res.json({ error: "Oops Something went wrong :(" });
  }
};

exports.forgotPasswordS3 = async (req, res) => {
  try {
    const { newPassword, user_code } = req.body;
    await User.update(
      { password: get_encrypted_password(newPassword) },
      { where: { user_code } }
    );
    await User.update({ otp: null }, { where: { user_code } });
    return res.json({ msg: "password has been changed successfully" });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Oops Something went wrong :(" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { newPassword, user_code, company_id, oldPassword } = req.body;
    const user = await User.findOne({ raw: true, where: { user_code } });
    console.log(oldPassword, get_encrypted_password(oldPassword));
    console.log(user.password);
    if (user.password != get_encrypted_password(oldPassword)) {
      return res.status(400).json({ error: "Old Password is wrong" });
    }
    await User.update(
      { password: get_encrypted_password(newPassword) },
      { where: { user_code, company_id } }
    );
    return res.json({ msg: "your password has been changed successfully" });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Failed to changed Password" });
  }
};

exports.changeProfilePhoto = async (req, res) => {
  try {
    const { id, profile_picture } = req.body;
    await User.update({ profile_picture }, { where: { id } });
    return res.json({ msg: "Profile Photo has been updated successfully" });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Failed to update profile photo" });
  }
};
