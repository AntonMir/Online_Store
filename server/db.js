/**
 * конфигурация подключения к БД
 */

const { Sequelize } = require('sequelize') // нам нужен конкретно класс Sequelize

// сразу экспортируем новый объект из этого класса
module.exports = new Sequelize(
    // тут передаем конфигурацию из переменного окружения (.env)
    process.env.DB_NAME, // Название БД
    process.env.DB_USER, // Пользователь
    process.env.DB_PASSWORD, // Пароль
    {
        dialect: 'postgres', // SQL различается в разных СУБД
        host: process.env.DB_HOST, // ip адрес БД
        port: process.env.DB_PORT // порт размещения PostgresSQL
    }

)