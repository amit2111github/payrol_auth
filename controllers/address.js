const { Address } = require("../models/index.js");

exports.createAddress = async (req, res, next) => {
  try {
    const { id, latitude, longitude, city, state, pin_code, address_line } =
      req.body;
    console.log(req.body);
    const data = await Address.create({
      user_id: id,
      latitude,
      longitude,
      city,
      state,
      pin_code,
      address_line,
    });
    return res.json({ data });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Failed to create Address" });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const { company_id, id, address_id, ...others } = req.body;
    console.log(others);
    const data = await Address.update(
      { ...others },
      { where: { id: address_id } }
    );

    return res.json({ data });
  } catch (err) {
    return res.status(400).json({ error: "Failed to update Address" });
  }
};
