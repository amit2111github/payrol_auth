module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    'Address',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      latitude: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      longitude: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      city: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      state: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      pin_code: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      address_line: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      type: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'address',
      schema: 'public',
      timestamps: false,
      underscored: true,
      indexes: [
        {
          name: 'pk_address',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    }
  );

  // const allAttributes = [
  //   'id',
  //   'user_id',
  //   'latitude',
  //   'longitude',
  //   'city',
  //   'state',
  //   'pin_code',
  //   'address_line',
  // ];
  Address.associate = (models) => {
    Address.hasMany(models.Company, {
      foreignKey: 'address',
    });
    Address.belongsTo(models.User, {
      foreignKey: 'user_id',
      sourceKey: 'id',
      as: 'user',
    });
  };

  return Address;
};
