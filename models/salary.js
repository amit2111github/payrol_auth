module.exports = (sequelize, DataTypes) => {
  const Salary = sequelize.define(
    "Salary",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      type: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "salary",
      schema: "public",
      timestamps: false,
      underscored: true,
      indexes: [
        {
          name: "pk_salary",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );

  // const allAttributes = [
  //   'id',
  //   'user_id',
  //   'type',
  //   'amount',
  // ];
  Salary.associate = (models) => {
    Salary.belongsTo(models.User, {
      foreignKey: "user_id",
      sourceKey: "id",
      as: "user_id_as",
    });
  };

  return Salary;
};
