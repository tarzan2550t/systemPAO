import express from 'express'
import * as auth_controllers from '../controllers/auth.controller.js'
import { firstloginMiddleware , authMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/register' , auth_controllers.register)
router.post('/login' , auth_controllers.login)
router.patch('/changepassword' , firstloginMiddleware , auth_controllers.changepassword )
router.get('/me' , authMiddleware() , auth_controllers.me )

export default router