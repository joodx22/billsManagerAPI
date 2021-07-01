
module.exports = async () => {
    console.log('setting associations...')

    //user & role
    role.hasMany(user,{foreignKey:'roleId',as:'users'})
    user.belongsTo(role,{foreignKey:'roleId',as:'role'})

    //bill & user
    user.hasMany(bill,{foreignKey:'userId',as:'bills'})
    bill.belongsTo(user,{foreignKey:'userId',as:'user'})

    //bill & created by user
    user.hasMany(bill,{foreignKey:'createdBy',as:'createdBills'})
    bill.belongsTo(user,{foreignKey:'createdBy',as:'createdByUser'})

    //bill & bill item
    bill.hasMany(billItem,{foreignKey:'billId',as:'billItems'})
    billItem.belongsTo(bill,{foreignKey:'billId',as:'bill'})

    //item & bill item
    item.hasMany(billItem,{foreignKey:'itemId',as:'billItems'})
    billItem.belongsTo(item,{foreignKey:'itemId',as:'item'})

    //item & item image
    item.hasMany(itemImage,{foreignKey:'itemId',as:'images'})
    itemImage.belongsTo(item,{foreignKey:'itemId',as:'item'})

    //item & item purchase
    item.hasMany(itemPurchase,{foreignKey:'itemId',as:'users'})
    itemPurchase.belongsTo(item,{foreignKey:'itemId',as:'item'})

    console.log('setting associations has gone perfect!')
}
