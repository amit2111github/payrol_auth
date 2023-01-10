const db = require('./models/index.js');
exports.init = async () => {
  try {
    global.sequelize = db.sequelize;
    global.Sequelize = db.Sequelize;
    await db.sequelize.authenticate({ login: false });
  } catch (err) {
    console.error('Error : ', err);
  }
};
