module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define(
    "Department",
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
          model: "company",
          key: "id",
        },
      },
      managed_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "user",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "department",
      schema: "public",
      timestamps: false,
      underscored: true,
      indexes: [
        {
          name: "pk_department",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );

  // const allAttributes = [
  //   'id',
  //   'name',
  //   'company_id',
  //   'managed_by',
  // ];
  Department.associate = (models) => {
    Department.belongsTo(models.Company, {
      foreignKey: "company_id",
      sourceKey: "id",
      as: "company_id_as",
    });
    Department.belongsTo(models.User, {
      foreignKey: "managed_by",
      sourceKey: "id",
      as: "managedBy",
    });
    Department.hasMany(models.User, {
      foreignKey: "department_id",
      as: "users",
    });
  };

  return Department;
};
