const department = require("../models/department.js");
const { sequelize } = require("../models/index.js");
const db = require("../models/index.js");
const { models } = db.sequelize;
const { Department, User } = models;
const Op = db.Sequelize.Op;

exports.createDepartment = async (req, res, next) => {
  try {
    const { name, company_id, managed_by } = req.body;
    const data = await Department.findOne({ where: { company_id, name } });
    if (data) {
      return res.json({ error: `Department ${name} already exists.` });
    }
    await Department.create({
      name,
      company_id,
      managed_by: managed_by ? +managed_by : null,
    });
    return res
      .status(200)
      .json({ msg: `Department ${name} created successfully.` });
  } catch (err) {
    return res.status(400).json({ error: "Failed to Create Department." });
  }
};

// const allAttributes = [
//   'id',
//   'name',
//   'company_id',
//   'managed_by',
// ];
exports.changeManager = async (req, res) => {
  try {
    const { user_id, company_id, department_id } = req.body;
    const user = await User.findOne({
      raw: true,
      where: { user_code: user_id },
    });
    if (!user) {
      return res.json({ error: "No such Employee." });
    }
    const data = await Department.findOne({
      where: { company_id, id: department_id },
    });
    if (data.managed_by == user_id)
      return res.json({ msg: "He is already a manager of this department" });
    await sequelize.transaction(async (t) => {
      await User.update(
        { role: "EMPLOYEE" },
        { where: { id: data.managed_by } },
        { transaction: t }
      );
      await Department.update(
        { managed_by: user.id },
        { where: { company_id, id: department_id } },
        { transaction: t }
      );
      await User.update(
        { role: "MANAGER", department_id },
        { where: { id: user.id } },
        { transaction: t }
      );
    });
    const msg = "Manager updated successfully for " + data.name + " department";

    return res.json({ msg });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Failed to Change Manager" });
  }
};

exports.getAllDepartment = async (req, res) => {
  try {
    const { company_id } = req.body;
    const data = await Department.findAll({
      where: { company_id },
      include: [{ model: User, as: "managedBy" }],
    });
    return res.json(data);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Failed to Fetch All Departments" });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const { department_id } = req.body;
    const data = await User.findAll({
      where: { department_id, role: "EMPLOYEE" },
    });
    return res.json(data);
  } catch (err) {
    console.log(err);
    return res.json({ error: "Failed to get All User." });
  }
};
