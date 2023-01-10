module.exports = (sequelize, DataTypes) => {
  const Investment = sequelize.define(
    "Investment",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "homeloan , medical , investment",
      },
      amount: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      investment_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      proof: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "investment",
      schema: "public",
      timestamps: false,
      underscored: true,
      indexes: [
        {
          name: "pk_investment",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );

  // const allAttributes = [
  //   'id',
  //   'name',
  //   'amount',
  //   'investment_date',
  //   'proof',
  // ];
  Investment.associate = (models) => {
    Investment.hasMany(models.UserInvestment, {
      foreignKey: "medical_id",
    });
    Investment.hasMany(models.UserInvestment, {
      foreignKey: "investment_id",
    });
    Investment.hasMany(models.UserInvestment, {
      foreignKey: "home_load_id",
    });
  };

  return Investment;
};
