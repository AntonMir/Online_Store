const { Type } = require('@models/models.js')
const ApiErrors = require('@error/ApiError.js')
/**
 * обращаемся к этим функциям через routes
 * GET /api/type
 * GET /api/type/:id
 * POST /api/type
 * PUT /api/type/:id
 * DELETE /api/type/:id
 */

class TypeController {

    // создание POST
    async create(req, res) {
        try {
            const { name } = req.body // вытягиваем имя из тела запроса
            const type = await Type.create({ name: name })
            return res.status(201).json(type)
        } catch (error) {
            return res.status(400).json({ message: 'Ошибка создания типа' })
        }
    }

    // получение GET
    async getAll(req, res) {
        try {
            const types = await Type.findAll()
            return res.status(200).json(types)
        } catch (error) {
            return res.status(400).json({ message: 'Ошибка получения типов' })
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params
            const type = await Type.findOne({ where: { id: id } })
            return res.status(200).json(type)
        } catch (error) {
            return res.status(400).json({ message: 'Ошибка получения типа' })
        }
    }

    // обновление PUT
    async update(req, res) {
        try {
            const { name } = req.body
            const { id } = req.params
            await Type.update({ name: name }, { where: { id: id } })
            const type = await Type.findOne({ where: { id: id } })
            return res.status(201).json(type)
        } catch (error) {
            return res.status(400).json({ message: "Ошибка обновления бренда" })
        }
    }

    // удаление DELETE
    async delete(req, res) {
        try {
            const { id } = req.params
            await Type.destroy({ where: { id: id } })
            return res.status(200).json({ message: "Тип успешно удален" })
        } catch (error) {
            return res.status(400).json({ message: 'Ошибка удаления типа' })
        }
    }

}

// экспортируем новый экземпляр класса
module.exports = new TypeController();