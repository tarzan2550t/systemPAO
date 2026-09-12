import express from 'express'
import * as auth_controllers from '../controllers/auth.controller.js'
import { firstloginMiddleware} from '../middleware/first_login.middleware.js'

const router = express.Router()

router.post('/register' , auth_controllers.register)
router.post('/login' , auth_controllers.login)
router.patch('/changepassword' , firstloginMiddleware , auth_controllers.changepassword )

export default router