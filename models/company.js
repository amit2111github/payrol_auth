module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    "Company",
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
      logo: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      base_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      comany_code: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      address: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "address",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "company",
      schema: "public",
      timestamps: false,
      underscored: true,
      indexes: [
        {
          name: "pk_company",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );

  // const allAttributes = [
  //   'id',
  //   'name',
  //   'logo',
  //   'base_url',
  //   'comany_code',
  //   'address',
  // ];
  Company.associate = (models) => {
    Company.belongsTo(models.Address, {
      foreignKey: "address",
      sourceKey: "id",
      as: "company_address",
    });
    Company.hasMany(models.CompanyGrantedLeaves, {
      foreignKey: "company_id",
    });
    Company.hasMany(models.Department, {
      foreignKey: "company_id",
    });
    Company.hasMany(models.EmployeeType, {
      foreignKey: "company_id",
    });
    Company.hasMany(models.User, {
      foreignKey: "company_id",
    });
  };

  return Company;
};
