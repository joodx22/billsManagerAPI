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
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "price"
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "amount"
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "description"
    },
    dateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp'),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "dateTime"
    },
    itemId: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "itemId",
      references: {
        key: "id",
        model: "item_model"
      }
    }
  };
  const options = {
    tableName: "itempurchase",
    comment: "",
    indexes: [{
      name: "itemPurchase_item_relation",
      unique: false,
      type: "BTREE",
      fields: ["itemId"]
    }]
  };
  const ItempurchaseModel = sequelize.define("itempurchase_model", attributes, options);
  return ItempurchaseModel;
};