module.exports = (sequelize, DataTypes) => {
  const UserInvestment = sequelize.define(
    "UserInvestment",
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
      investment_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "investment",
          key: "id",
        },
      },
      home_load_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "investment",
          key: "id",
        },
      },
      medical_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "investment",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "user_investment",
      schema: "public",
      timestamps: false,
      underscored: true,
      indexes: [
        {
          name: "pk_user_investment",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );

  // const allAttributes = [
  //   'id',
  //   'user_id',
  //   'investment_id',
  //   'home_load_id',
  //   'medical_id',
  // ];
  UserInvestment.associate = (models) => {
    UserInvestment.belongsTo(models.Investment, {
      foreignKey: "medical_id",
      sourceKey: "id",
      as: "medical_id_as",
    });
    UserInvestment.belongsTo(models.Investment, {
      foreignKey: "investment_id",
      sourceKey: "id",
      as: "investment_id_as",
    });
    UserInvestment.belongsTo(models.Investment, {
      foreignKey: "home_load_id",
      sourceKey: "id",
      as: "home_load_id_as",
    });
    UserInvestment.belongsTo(models.User, {
      foreignKey: "user_id",
      sourceKey: "id",
      as: "user_id_as",
    });
  };

  return UserInvestment;
};
