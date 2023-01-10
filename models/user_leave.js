module.exports = (sequelize, DataTypes) => {
  const UserLeave = sequelize.define(
    'UserLeave',
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
          model: 'user',
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
      used: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      assigned: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      from: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      to: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'user_leave',
      schema: 'public',
      timestamps: false,
      underscored: true,
      indexes: [
        {
          name: 'pk_user_leave',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    }
  );

  // const allAttributes = [
  //   'id',
  //   'user_id',
  //   'leave_id',
  //   'used',
  //   'assigned',
  //   'from',
  //   'to',
  // ];
  UserLeave.associate = (models) => {
    UserLeave.belongsTo(models.LeaveType, {
      foreignKey: 'leave_id',
      sourceKey: 'id',
      as: 'leave_id_as',
    });
    UserLeave.belongsTo(models.User, {
      foreignKey: 'user_id',
      sourceKey: 'id',
      as: 'user_id_as',
    });
  };

  return UserLeave;
};
