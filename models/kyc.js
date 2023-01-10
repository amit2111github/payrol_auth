module.exports = (sequelize, DataTypes) => {
  const Kyc = sequelize.define(
    "Kyc",
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
      father_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      legal_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      mother_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      pan_number: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      pan_proof: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      aadhar_number: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      aadhar_proof: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      live_photo: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      is_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      rejection_reason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "kyc",
      schema: "public",
      timestamps: false,
      underscored: true,
      indexes: [
        {
          name: "pk_kyc",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );

  // const allAttributes = [
  //   'id',
  //   'user_id',
  //   'father_name',
  //   'legal_name',
  //   'mother_name',
  //   'pan_number',
  //   'pan_proof',
  //   'aadhar_number',
  //   'aadhar_proof',
  //   'live_photo',
  //   'is_verified',
  //   'rejection_reason',
  // ];
  Kyc.associate = (models) => {
    Kyc.belongsTo(models.User, {
      foreignKey: "user_id",
      sourceKey: "id",
      as: "user_id_as",
    });
  };

  return Kyc;
};
