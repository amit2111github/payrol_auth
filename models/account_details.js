module.exports = (sequelize, DataTypes) => {
  const AccountDetails = sequelize.define(
    "AccountDetails",
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
      account_number: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      bank_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      is_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      passbook_photo: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      branch_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      ifsc_code: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "account_details",
      schema: "public",
      timestamps: false,
      underscored: true,
      indexes: [
        {
          name: "pk_account_details",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );

  // const allAttributes = [
  //   'id',
  //   'user_id',
  //   'account_number',
  //   'bank_name',
  //   'is_verified',
  //   'passbook_photo',
  //   'branch_name',
  //   'ifsc_code',
  // ];
  AccountDetails.associate = (models) => {
    AccountDetails.belongsTo(models.User, {
      foreignKey: "user_id",
      sourceKey: "id",
      as: "user",
    });
  };

  return AccountDetails;
};
