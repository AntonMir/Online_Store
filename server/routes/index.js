/**
 * Централизованное управление всеми роутами
 */

const Router = require('express');
const router = new Router();

const userRouter = require('@routes/userRoute.js')
const deviceRoute = require('@routes/deviceRoute.js')
const typeRoute = require('@routes/typeRoute.js')
const brandRoute = require('@routes/brandRoute.js')


router.use('/user', userRouter)
router.use('/device', deviceRoute)
router.use('/type', typeRoute)
router.use('/brand', brandRoute)


module.exports = router