/**
 * Универсаьный erorr-хендлер для обработки неверных URL запросов
 * Наследуем Error
 * 
 */

class ApiError extends Error {

    // как props
    constructor(status, message) {
        super() // вызываем родительский конструктор Error
        this.status = status
        this.message = message
    }

    // static - функция к которой можем обращаться напрямую из Класса не из экземпляра
    static badRequest(message) {
        return new ApiError(404, message)
    }

    static internal(message) {
        // internal - внутренний
        return new ApiError(500, message)
    }

    static forbidden(message) {
        return new ApiError(403, message)
    }

}

module.exports = ApiError