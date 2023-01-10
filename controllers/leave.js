const { sequelize } = require('../models/index.js');
const db = require('../models/index.js');
const user = require('../models/user.js');
const { models } = db.sequelize;
const { CompanyGrantedLeaves, User, UserLeave } = models;

exports.createLeave = async (req, res) => {
  try {
    const { id, ...others } = req.body;
    const { company_id, leave_id } = others;
    const isAlreadyAlloted = await CompanyGrantedLeaves.findOne({
      where: { company_id, leave_id },
    });
    if (isAlreadyAlloted) {
      return res.json({
        error: 'This leave has already been allocated for your company',
      });
    }

    await sequelize.transaction(async (t) => {
      const data = await CompanyGrantedLeaves.create(
        { ...others },
        { transaction: t }
      );
      let users = await User.findAll(
        {
          where: { company_id, currently_working: true },
          attributes: ['id'],
        },
        { transaction: t }
      );
      const date = new Date();
      users = users.map((user) => ({
        user_id: user.id,
        leave_id,
        assigned: others.days,
        from: new Date(),
        to: new Date(date.getFullYear() + '-' + 12 + '-' + 31),
      }));
      users = await UserLeave.bulkCreate(users, { transaction: t });
      return res.json({
        msg: 'Leave has been alloted successfully for your company.',
      });
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ error: 'Failed to create this leave for company' });
  }
};
