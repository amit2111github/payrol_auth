module.exports = (sequelize, DataTypes) => {
  const Education = sequelize.define(
    "Education",
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
      degree_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      from: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      to: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      institution_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      cgpa: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      mode: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "online/offline",
      },
    },
    {
      sequelize,
      tableName: "education",
      schema: "public",
      timestamps: false,
      underscored: true,
      indexes: [
        {
          name: "pk_education",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );

  // const allAttributes = [
  //   'id',
  //   'user_id',
  //   'degree_name',
  //   'from',
  //   'to',
  //   'institution_name',
  //   'cgpa',
  //   'mode',
  // ];
  Education.associate = (models) => {
    Education.belongsTo(models.User, {
      foreignKey: "user_id",
      sourceKey: "id",
      as: "user_id_as",
    });
  };

  return Education;
};
