module.exports = (sequelize, DataTypes) => {
  const CompanyGrantedLeaves = sequelize.define(
    'CompanyGrantedLeaves',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'company',
          key: 'id',
        },
      },
      leave_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'leave_type',
          key: 'id',
        },
      },
      days: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_cashable: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      percent_refundable: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: 10.0,
      },
    },
    {
      sequelize,
      tableName: 'company_granted_leaves',
      schema: 'public',
      timestamps: false,
      underscored: true,
      indexes: [
        {
          name: 'pk_company_granted_leaves',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    }
  );

  // const allAttributes = [
  //   'id',
  //   'company_id',
  //   'leave_id',
  //   'days',
  //   'is_cashable',
  //   'percent_refundable',
  // ];
  CompanyGrantedLeaves.associate = (models) => {
    CompanyGrantedLeaves.belongsTo(models.Company, {
      foreignKey: 'company_id',
      sourceKey: 'id',
      as: 'company_id_as',
    });
    CompanyGrantedLeaves.belongsTo(models.LeaveType, {
      foreignKey: 'leave_id',
      sourceKey: 'id',
      as: 'leave_id_as',
    });
  };

  return CompanyGrantedLeaves;
};
