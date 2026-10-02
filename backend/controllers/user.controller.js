import * as userService from '../services/user.js'

export async function getAllUsers(req, res, next) {
    try {
        const users = await userService.getAllUsers()
        res.json(users)
    } catch (e) {
        next(e)
    }
}

export async function createUser(req, res, next) {
    try {
        const { name, email, password, role, department, position } = req.body
        const result = await userService.createUser(name, email, password, role, department, position)
        res.json(result)
    } catch (e) {
        next(e)
    }
}

export async function updateUser(req, res, next) {
    try {
        const { id } = req.params
        const result = await userService.updateUser(id, req.body)
        res.json(result)
    } catch (e) {
        next(e)
    }
}

export async function deleteUser(req, res, next) {
    try {
        const { id } = req.params
        const result = await userService.deleteUser(id)
        res.json(result)
    } catch (e) {
        next(e)
    }
}
