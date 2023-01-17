const db = require("../models/index.js");
const { models } = db.sequelize;
const { Company, Address, User } = models;
const alphanumericRandom = require("alphanumeric-random-string-generator");
const { get_encrypted_password } = require("../services/encryption/index.js");

console.log(get_encrypted_password());
const base_app_url = "payrool.com";

exports.createCompany = async (req, res) => {
  try {
    const { comapany_name, logo } = req.body;
    console.log(logo);
    const data = await sequelize.transaction(async (t) => {
      const address = await Address.create(
        {
          user_id: req.body.user_id,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          city: req.body.longitude,
          state: req.body.state,
          pin_code: req.body.pin_code,
          address_line: req.body.address_line,
        },
        { transaction: t }
      );

      const company = await Company.create(
        {
          name: comapany_name,
          logo: logo,
          base_url: comapany_name + "." + base_app_url,
          comany_code: alphanumericRandom(6), // TODO:
          address: address.id,
        },
        { transaction: t }
      );
      const encrypted_password = get_encrypted_password(req.body.password);
      const user = await User.create(
        {
          name: req.body.name,
          email: req.body.email,
          phone_number: req.body.phone_number,
          password: encrypted_password,
          gender: req.body.gender,
          company_id: company.id,
          role: req.body.role,
          joning_date: new Date(),
          user_code:
            company.name
              .substring(0, Math.min(company.name.length, 3))
              .toUpperCase() + getRandomNumber(5),
        },
        { transaction: t }
      );
      return { address, company, user };
    });
    return res.status(200).json({ msg: "Company created Successfully", data });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Failed to create Company" });
  }
};

exports.getCompany = async (req, res) => {
  try {
    const { name } = req.params;
    console.log("here");
    const data = await Company.findOne({ where: { name } });
    return res.json(data);
  } catch (err) {
    return res.json({ error: "Failed to get Company details" });
  }
};
const getRandomNumber = (len) => {
  let ans = "";
  for (let i = 0; i < len; i++) ans += Math.floor(Math.random() * 10);
  return ans;
};
exports.getRandomNumber = getRandomNumber;
