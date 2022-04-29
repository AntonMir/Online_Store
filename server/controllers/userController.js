const ApiError = require('@error/ApiError.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Basket } = require('@models/models.js')

/**
 * обращаемся к этим функциям через routes
 * POST /api/user/registration
 * POST /api/user/login
 * POST /api/user/auth
 */

function generateJwt(id, email, role) {
    return jwt.sign(
        { email, role, id }, // формируем payload - тело JWT
        process.env.SECRET_KEY, // обязательный секретный ключ
        { expiresIn: '24h' } // истекает через 24 часа
    )
}


class UserController {

    // регистрация
    async registration(req, res) {
        const { email, password, role } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: 'Некорректные данные email или password' })
        }

        const candidate = await User.findOne({ where: { email } })

        if (candidate) {
            return res.status(400).json({ message: `Пользователь с email: ${email} уже существует` })
        }

        // хешируем пароль с солью 4(4 круга зашифровки)
        const hashPassword = await bcrypt.hash(password, 4)

        // создаем нового пользователя
        const user = await User.create({ email, password: hashPassword, role })
        // создаем новому пользователю его корзину
        const basket = await Basket.create({ userId: user.id }) // новая корзина для нового пользователя

        // генерим ему токен
        const token = generateJwt(user.id, user.email, user.role)

        return res.status(201).json({ token }) // после регистрации отдаем токен на клиент
    }

    // логин
    async login(req, res) {
        const { email, password } = req.body

        // если пустое поле email или pass
        if (!email || !password) {
            return res.status(400).json({ message: 'Некорректные данные email или password' })
        }

        // ищем в базе совпадения
        const user = await User.findOne({ where: { email } })

        // если нет, выдаем ошибку
        if (!user) {
            return res.status(404).json({ message: 'Пользователь с таким email отсутствует' })
        }

        // сравнение пароль из базы с паролем пришедшим
        const comparePussword = await bcrypt.compareSync(password, user.password) // сравниваем 2 пароля

        // если пароли не совпали
        if (!comparePussword) {
            return res.status(400).json({ message: 'Пароль введен не верно' })
        }

        // Если все ОК, генерим новый токен
        const token = generateJwt(user.id, user.email, user.role)

        // отдаем токен на клиент
        return res.status(200).json({ token }) // после регистрации отдаем токен на клиент
    }

    // проверка авторизован ли пользователь или нет
    async check(req, res, next) {
        // полученный из next()
        const { id, email, role } = req.user

        // генерим новый токен
        const token = generateJwt(id, email, role)

        // отдаем обратно на клиент
        return res.status(200).json({ token })
    }
}

// экспортируем новый экземпляр класса
module.exports = new UserController();