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
    imagePath: {
      type: DataTypes.STRING(2000),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "imagePath"
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
    tableName: "itemimage",
    comment: "",
    indexes: [{
      name: "itemImage_item_relation",
      unique: false,
      type: "BTREE",
      fields: ["itemId"]
    }]
  };
  const ItemimageModel = sequelize.define("itemimage_model", attributes, options);
  return ItemimageModel;
};