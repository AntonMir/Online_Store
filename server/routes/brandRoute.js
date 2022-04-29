const Router = require('express');
const router = new Router();
const brandController = require('@controllers/brandController.js')

// Создаем бренд
router.post('/', brandController.create)

// Получаем бренды
router.get('/', brandController.getAll)

// Получаем 1 бренд
router.get('/:id', brandController.getOne)

// обновляем 
router.put('/:id', brandController.update)

// удаляем бренд
router.delete('/:id', brandController.delete)


module.exports = router