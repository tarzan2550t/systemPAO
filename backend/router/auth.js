import express from 'express'
import * as auth_controllers from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/register' , auth_controllers.register)
router.post('/login' , auth_controllers.login)


export default router