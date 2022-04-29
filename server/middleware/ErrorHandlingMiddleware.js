/**
 * мидлвара возвращает ошибку 404/500/403
 * если запрос клиента был неверный
 * см. @error/ApiError.js
 */

const ApiError = require('@error/ApiError.js')

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message })
    }

    return res.status(500).json({ message: 'Непредвиденная ошибка!' })
}