module.exports = (sequelize, DataTypes) => {
  const EmployeeType = sequelize.define(
    'EmployeeType',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'company',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'employee_type',
      schema: 'public',
      timestamps: false,
      underscored: true,
      indexes: [
        {
          name: 'pk_employee_type',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    }
  );

  // const allAttributes = [
  //   'id',
  //   'name',
  //   'company_id',
  // ];
  EmployeeType.associate = (models) => {
    EmployeeType.belongsTo(models.Company, {
      foreignKey: 'company_id',
      sourceKey: 'id',
      as: 'company_id_as',
    });
    EmployeeType.hasMany(models.User, {
      foreignKey: 'employee_type',
    });
  };

  return EmployeeType;
};
