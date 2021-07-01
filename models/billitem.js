const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id"
    },
    itemPurchasePrice: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "itemPurchasePrice"
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
    },
    billId: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "billId",
      references: {
        key: "id",
        model: "bill_model"
      }
    }
  };
  const options = {
    tableName: "billitem",
    comment: "",
    indexes: [{
      name: "billItem_item_relation",
      unique: false,
      type: "BTREE",
      fields: ["itemId"]
    }, {
      name: "billItem_bill_relation",
      unique: false,
      type: "BTREE",
      fields: ["billId"]
    }]
  };
  const BillitemModel = sequelize.define("billitem_model", attributes, options);
  return BillitemModel;
};