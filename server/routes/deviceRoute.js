const Router = require('express');
const router = new Router();
const deviceController = require('@controllers/deviceController.js')

// Создаем устройство
router.post('/', deviceController.create)

// Получаем все устройства
router.get('/', deviceController.getAll)

// получаем определенное устройство
router.get('/:id', deviceController.getOne)


module.exports = router