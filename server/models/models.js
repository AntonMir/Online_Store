const sequelize = require('@root/db.js') // импортируем конфиги подключения к БД
const { DataTypes } = require('sequelize') // Класс, помогает определить тип поля

/**
 * ПАРАМЕТРЫ ПОЛЯ
 * 
 * type: DataTypes.INTEGER - тип поля Число
 * primaryKey: true - первичный ключ
 * autoIncrement: true - уникальность, но не по порядку
 * unique: true - уникальность
 * defaultValue: "USER" - начальное значение
 * allowNull: false - не может быть пустым
*/


// СХЕМЫ ТАБЛИЦ (Модели)

// 1) пользователь
const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" }
})

// 2) корзина
const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

// 3) устройство в корзине
const BasketDevice = sequelize.define('basket_device', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

// 4) устройство
const Device = sequelize.define('device', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue: 0 },
    img: { type: DataTypes.STRING, allowNull: false },
})

// 5) тип устройства
const Type = sequelize.define('type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

// 6) брэнд устройства
const Brand = sequelize.define('brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

// 7) рейтинг пользователя
const Rating = sequelize.define('raiting', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    raiting: { type: DataTypes.INTEGER, allowNull: false },
})

// 8) инфо об устройстве
const DeviceInfo = sequelize.define('device_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
})

// 9) промежуточная таблица для Type и Brand
const TypeBrand = sequelize.define('type_brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

// СХЕМА СВЯЗЕЙ ТАБЛИЦ

/**
 * .hasOne() - связь один к одному
 * .hasMany() - связь 1 ко многим
 * .belongsTo() - принадлежность
 * .belongsToMany() - связь многое ко многим
*/

User.hasOne(Basket) // связь 1 к 1
Basket.belongsTo(User) // корзина пренадлежит пользователю

User.hasMany(Rating) // связь 1 ко многим
Rating.belongsTo(User) // рэйтинги зависят от пользователя

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Type.hasMany(Device)
Device.belongsTo(Type)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Device.hasOne(BasketDevice)
BasketDevice.belongsTo(Device)

Device.hasMany(DeviceInfo, { as: 'info' })
DeviceInfo.belongsTo(Device)

// Зависимость мнгих ко многим + промежуточная, связывающая таблица
Type.belongsToMany(Brand, { through: TypeBrand })
Brand.belongsToMany(Type, { through: TypeBrand })


// экспортируем все модели
module.exports = {
    User,
    Basket,
    BasketDevice,
    Device,
    Type,
    Brand,
    Rating,
    TypeBrand,
    DeviceInfo
}