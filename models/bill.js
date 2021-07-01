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
    discount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "discount"
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
    userId: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "userId",
      references: {
        key: "id",
        model: "user_model"
      }
    }
  };
  const options = {
    tableName: "bill",
    comment: "",
    indexes: [{
      name: "bill_user_relation",
      unique: false,
      type: "BTREE",
      fields: ["userId"]
    }]
  };
  const BillModel = sequelize.define("bill_model", attributes, options);
  return BillModel;
};