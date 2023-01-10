const { SequelizeModel } = require("sequelize-oro");

const config = {
  database: "payrool",
  username: "postgres",
  password: "password",
  host: "localhost",
  dialect: "postgres",
};

const migration = new SequelizeModel(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    caseModel: "p",
    directory: "./models/", // where to write files
    noInitModels: true,
    additional: {
      timestamps: true,
      underscored: true,
    },
  }
);
migration.run().then((data) => {
  console.log(data.tables);
});
