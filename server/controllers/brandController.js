const { Brand } = require('@models/models.js')

/**
 * обращаемся к этим функциям через routes
 * GET /api/brand/
 * GET /api/brand/:id
 * POST /api/brand
 * PUT /api/brand/:id
 * DELETE /api/brand/:id
 */

class BrandController {

    // создание POST
    async create(req, res) {
        try {
            const { name } = req.body
            const brand = await Brand.create({ name: name })
            return res.status(201).json(brand)
        } catch (error) {
            return res.status(400).json({ message: "Ошибка создания бренда" })
        }
    }

    // получение GET
    async getAll(req, res) {
        try {
            const brand = await Brand.findAll()
            return res.status(200).json(brand)
        } catch (error) {
            return res.status(400).json({ message: "Ошибка получения брендов" })
        }
    }

    // единичное получение GET
    async getOne(req, res) {
        try {
            const { id } = req.params
            const brand = await Brand.findOne({ where: { id: id } })
            return res.status(200).json(brand)
        } catch (error) {
            return res.status(400).json({ message: "Ошибка получения бренда" })
        }
    }


    // обновление PUT
    async update(req, res) {
        try {
            const { name } = req.body
            const { id } = req.params
            await Brand.update({ name: name }, { where: { id: id } })
            const brand = await Brand.findOne({ where: { id: id } })
            return res.status(201).json(brand)
        } catch (error) {
            return res.status(400).json({ message: "Ошибка обновления бренда" })
        }
    }

    // удаление DELETE
    async delete(req, res) {
        try {
            const { id } = req.params
            await Brand.destroy({ where: { id: id } })
            return res.status(200).json({ message: "бренд успешно удален" })
        } catch (error) {
            return res.status(400).json({ message: "Ошибка удаления бренда" })
        }
    }
}

// экспортируем новый экземпляр класса
module.exports = new BrandController();