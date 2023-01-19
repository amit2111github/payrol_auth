module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
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
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: "unq_user",
      },
      phone_number: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      gender: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "company",
          key: "id",
        },
      },
      role: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      employee_type: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "employee_type",
          key: "id",
        },
      },
      department_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "department",
          key: "id",
        },
      },
      profile_picture: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      currently_working: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      joning_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      leaving_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      tax_slab: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "old or new",
      },
      user_code: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      otp: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      otp_create_at: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "user",
      schema: "public",
      timestamps: false,
      underscored: true,
      indexes: [
        {
          name: "pk_tbl",
          unique: true,
          fields: [{ name: "id" }],
        },
        {
          name: "unq_user",
          unique: true,
          fields: [{ name: "email" }],
        },
      ],
    }
  );

  // const allAttributes = [
  //   'id',
  //   'name',
  //   'email',
  //   'phone_number',
  //   'password',
  //   'gender',
  //   'company_id',
  //   'role',
  //   'employee_type',
  //   'profile_picture',
  //   'currently_working',
  //   'joning_date',
  //   'leaving_date',
  //   'tax_slab',
  // ];
  User.associate = (models) => {
    User.belongsTo(models.Company, {
      foreignKey: "company_id",
      sourceKey: "id",
      as: "company",
    });
    User.belongsTo(models.EmployeeType, {
      foreignKey: "employee_type",
      sourceKey: "id",
      as: "employee_type_as",
    });
    User.belongsTo(models.Department, {
      foreignKey: "department_id",
      sourceKey: "id",
      as: "department_as",
    });
    User.hasMany(models.AccountDetails, {
      foreignKey: "user_id",
    });
    User.hasMany(models.Address, {
      foreignKey: "user_id",
    });
    User.hasMany(models.Department, {
      foreignKey: "managed_by",
      as: "department",
    });
    User.hasMany(models.Education, {
      foreignKey: "user_id",
    });
    User.hasMany(models.Kyc, {
      foreignKey: "user_id",
    });
    User.hasMany(models.RequestedLeave, {
      foreignKey: "user_id",
    });
    User.hasMany(models.Salary, {
      foreignKey: "user_id",
    });
    User.hasMany(models.UserInvestment, {
      foreignKey: "user_id",
    });
    User.hasMany(models.UserLeave, {
      foreignKey: "user_id",
    });
  };

  return User;
};
