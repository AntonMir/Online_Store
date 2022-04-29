const Router = require('express');
const router = new Router();
const typeController = require('@controllers/typeController.js')
const checkRole = require('@middleware/checkRoleMiddleware.js')

// Создаем тип устройста
router.post('/', checkRole('ADMIN'), typeController.create)

// Получаем все типы устройств
router.get('/', typeController.getAll)

// Получаем 1 тип
router.get('/:id', typeController.getOne)

// обновляем 
router.put('/:id', checkRole('ADMIN'), typeController.update)

// Удаляем тип устройста
router.delete('/:id', checkRole('ADMIN'), typeController.delete)

module.exports = router