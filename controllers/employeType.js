// const allAttributes = [
//   'id',
//   'name',
//   'company_id',
// ];
const db = require("../models/index.js");
const { models } = db.sequelize;
const { EmployeeType } = models;
exports.createEmployeeType = async (req, res) => {
  try {
    const { company_id, name } = req.body;
    const data = await EmployeeType.findOne({ where: { name, company_id } });
    if (data) {
      return res.json({
        error: "Employe type " + name + " already exists.",
      });
    }
    await EmployeeType.create({ company_id, name });
    return res.json({ msg: "Employe type " + name + " created successfully." });
  } catch (err) {
    console.log(err);
    return res.json({
      error: "Failed to create the " + name + " employee type",
    });
  }
};
exports.getEmployeeType = async (req, res) => {
  try {
    const { company_id } = req.body;
    const data = await EmployeeType.findAll({ company_id });
    return res.json(data);
  } catch (err) {
    console.log(err);
    return res.json({ error: "Failed to get All employe type " });
  }
};
