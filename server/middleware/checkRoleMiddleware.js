/**
 * В данном модуле будем проверять роль
 */
const jwt = require('jsonwebtoken')


module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next() // Если параметр запроса отличается от GET, POST, PUT, DELETE, то пропускаем эту мидлвару
        }

        try {
            const token = req.headers.authorization.split(" ")[1] // берем тело токена
            if (!token) {
                // если токена нет, отдаем ошибку
                return res.status(401).json({ message: 'Не авторизован!' })
            }
            // Если токен есть, надо расшифровать
            const decoded = jwt.verify(token, process.env.SECRET_KEY)

            if (decoded.role !== role) {
                return res.status(403).json({ message: 'Нет доступа' })
            }
            // decoded - оъект с данными пользователя: email, id, role
            // эти данные полуили из JWT
            // функцией next() передаем их в следующую мидлвару
            req.user = decoded
            next()

        } catch (error) {
            return res.status(401).json({ message: 'Не авторизован catch' })
        }
    }
}

