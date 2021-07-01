const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "id"
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "username"
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "password"
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "firstName"
    },
    middleName: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "middleName"
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "lastName"
    },
    contactNumber: {
      type: DataTypes.STRING(15),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "contactNumber"
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "email"
    },
    image: {
      type: DataTypes.STRING(2000),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "image"
    },
    registrationDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "registrationDate"
    },
    ex: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ex"
    },
    roleId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "roleId",
      references: {
        key: "id",
        model: "role_model"
      }
    }
  };
  const options = {
    tableName: "user",
    comment: "",
    indexes: [{
      name: "user_role_relation",
      unique: false,
      type: "BTREE",
      fields: ["roleId"]
    }]
  };
  const UserModel = sequelize.define("user_model", attributes, options);
  return UserModel;
};