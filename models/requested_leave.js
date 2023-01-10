module.exports = (sequelize, DataTypes) => {
  const RequestedLeave = sequelize.define(
    "RequestedLeave",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      leave_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "leave_type",
          key: "id",
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      from: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      to: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      attachment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "pending",
        comment: "pending/approved/rejected",
      },
      rejection_reason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "requested_leave",
      schema: "public",
      timestamps: false,
      underscored: true,
      indexes: [
        {
          name: "pk_requested_leave",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );

  // const allAttributes = [
  //   'id',
  //   'leave_id',
  //   'user_id',
  //   'from',
  //   'to',
  //   'description',
  //   'attachment',
  //   'status',
  //   'rejection_reason',
  // ];
  RequestedLeave.associate = (models) => {
    RequestedLeave.belongsTo(models.LeaveType, {
      foreignKey: "leave_id",
      sourceKey: "id",
      as: "leave_id_as",
    });
    RequestedLeave.belongsTo(models.User, {
      foreignKey: "user_id",
      sourceKey: "id",
      as: "user_id_as",
    });
  };

  return RequestedLeave;
};
