module.exports = (sequelize, DataTypes) => {
  const LeaveType = sequelize.define(
    'LeaveType',
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
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'will be used at tooltip',
      },
    },
    {
      sequelize,
      tableName: 'leave_type',
      schema: 'public',
      timestamps: false,
      underscored: true,
      indexes: [
        {
          name: 'pk_leave_type',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    }
  );

  // const allAttributes = [
  //   'id',
  //   'name',
  //   'description',
  // ];
  LeaveType.associate = (models) => {
    LeaveType.hasMany(models.CompanyGrantedLeaves, {
      foreignKey: 'leave_id',
    });
    LeaveType.hasMany(models.RequestedLeave, {
      foreignKey: 'leave_id',
    });
    LeaveType.hasMany(models.UserLeave, {
      foreignKey: 'leave_id',
    });
  };

  return LeaveType;
};
