import express from 'express'
import * as user_controllers from '../controllers/user.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()

// Apply auth middleware to all user routes
router.use(authMiddleware())

router.get('/', user_controllers.getAllUsers)
router.post('/', user_controllers.createUser)
router.put('/:id', user_controllers.updateUser)
router.delete('/:id', user_controllers.deleteUser)

export default router
