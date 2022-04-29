const uuid = require('uuid')
const path = require('path');
const { Device, DeviceInfo } = require('@models/models.js')

/**
 * обращаемся к этим функциям через routes
 * POST /api/device/
 * GET /api/device/
 * GET /api/device/:id
 */

/**
 *  Sequalize:
 *  findAndCountAll - добавляет свойство count, которое содержит кол-во всех элементов
 */

class DeviceController {

    // создание
    async create(req, res) {
        try {
            const { name, price, brandId, typeId, info } = req.body // info - массив характеристик
            const { img } = req.files // берем отправленную картинку
            let fileName = uuid.v4() + ".jpg" // создаем уникальное имя для img
            img.mv(path.resolve(__dirname, '..', 'static', fileName)) // перемещаем нашу картинку в static/ и присваиваем ей уникальное имя
            const device = await Device.create({ name, price, brandId, typeId, img: fileName })

            if (info) {
                info = JSON.parse(info)
                info.forEach(i => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id,
                    })
                })
            }

            return res.status(201).json(device)
        } catch (error) {
            return res.status(400).json({ message: "Ошибка содания устройства" })
        }
    }

    // получение
    async getAll(req, res) {
        try {
            let { brandId, typeId, limit, page } = req.query
            page = page || 1    // если страница не задана, то дефолтно стоит первая
            limit = limit || 10     // если нет лимита, то выводим по 10 на странице
            let offset = page * limit - limit   // если страница со 2, то значения из первой страницы нам не нужны
            let devices;
            if (!brandId && !typeId) {
                devices = await Device.findAndCountAll({ limit, offset })
            }
            if (brandId && !typeId) {
                devices = await Device.findAndCountAll({ where: { brandId }, limit, offset })
            }
            if (!brandId && typeId) {
                devices = await Device.findAndCountAll({ where: { typeId }, limit, offset })
            }
            if (brandId && typeId) {
                devices = await Device.findAndCountAll({ where: { brandId, typeId }, limit, offset })
            }

            return res.status(200).json(devices)
        } catch (error) {
            return res.status(400).json({ message: "Ошибка получения списка устройств" })
        }

    }

    // получить один определенный экземпляр
    async getOne(req, res) {
        try {
            const { id } = req.params
            const device = await Device.findOne({
                where: { id },
                include: [{ model: DeviceInfo, as: 'info' }]
            })
            return res.status(200).json(device)
        } catch (error) {
            return res.status(400).json({ message: "Ошибка получения устройства" })
        }
    }

}

// экспортируем новый экземпляр класса
module.exports = new DeviceController();