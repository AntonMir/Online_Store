const Router = require('express');
const router = new Router();
const userController = require('@controllers/userController.js')
const authMiddleware = require('@middleware/authMiddleware.js')


// Запрос на регистрацию
router.post('/registration', userController.registration)

// Вход
router.post('/login', userController.login)

// Аутентификация через JWT
router.get('/auth', authMiddleware, userController.check)


module.exports = router