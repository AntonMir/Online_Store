require('dotenv').config() // для доступа к process.env (файл "/server/.env") 
require('module-alias/register') // АЛИАСЫ
const express = require('express')
const sequelize = require('@root/db.js') // импортируем конфиги для подключения к БД
const models = require('@models/models.js') // импоритруем созданные для БД модели
const cors = require('cors')
const fileUpload = require('express-fileupload')
const routes = require('@routes/index.js')
const errorHandler = require('@middleware/ErrorHandlingMiddleware.js')
const TimeConvertor = require('@utils/TimeConvertor.js')
const chalk = require('chalk')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', routes)

// Обработка ошибок (тут не вызывается функци next, т.к. это последняя мидлвара)
app.use(errorHandler)

// Протестировали, работает ли Route
// app.get('/', (req, res) => {
//     res.status(200).json({ message: 'Working!!' })
// })


const start = async () => {
    // запускаем сервер, только если подключимся к БД
    try {
        let serverBootTimeStart = Date.now() // время начала запуска сервера
        await sequelize.authenticate() // тут происходит подключение к БД
        await sequelize.sync() // сверяет состояние базы данных со схемой данных
        app.listen(PORT, () => {
            let serverBootTimeEnd = Date.now()
            let serverBootTime = TimeConvertor.millisToSec(serverBootTimeEnd - serverBootTimeStart)
            console.log(chalk.bold(`Server started on port ` + chalk.blue(`${PORT}`)))
            console.log(chalk.bold(`Server boot time: ` + chalk.blue(`${serverBootTime}`)));
        })
    } catch (error) {
        console.log('!!!', 'Error:', error.message);
    }
}

start() // запуск сервера с подключением


