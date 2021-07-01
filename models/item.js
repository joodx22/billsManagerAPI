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
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "name"
    },
    arabicName: {
      type: DataTypes.STRING(300),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "arabicName"
    },
    unit: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "unit"
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "description"
    },
    purchasePrice: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "purchasePrice"
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "price"
    },
    isAvailable: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: "1",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "isAvailable"
    }
  };
  const options = {
    tableName: "item",
    comment: "",
    indexes: []
  };
  const ItemModel = sequelize.define("item_model", attributes, options);
  return ItemModel;
};