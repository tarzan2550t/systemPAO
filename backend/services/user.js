import conn from '../db/db.js'
import { AppError } from '../utils/AppError.js'
import { hashpassword } from '../utils/password.js'

export async function getAllUsers() {
    const users = await conn('users')
        .leftJoin('user_role', 'users.role_id', 'user_role.id')
        .select([
            'users.id',
            'users.name',
            'users.email',
            'users.position',
            'users.department',
            'user_role.name as role'
        ])
    return users
}

export async function createUser(name, email, password, department, position) {
    if (!email || !name) {
        throw new AppError('Email and name are required.', 400)
    }
    const examine = await conn('users').where({ email }).first()
    if (examine) { throw new AppError('มีผู้ใช้งานด้วยอีเมลนี้แล้ว', 409) }

    // Resolve roleName to role_id

    const password_hash = await hashpassword(password || '123456')

    await conn('users').insert({
        name,
        email,
        password_hash,
        department,
        position,
        role_id,
        must_change_password: 1
    })

    return { success: true, message: 'User created successfully' }
}

export async function updateUser(id, data) {
    // Only basic update
    const updateData = {}
    if (data.name) updateData.name = data.name
    if (data.email) updateData.email = data.email
    if (data.roleName) {
        const role = await conn('user_role').where({ name: data.roleName }).first()
        if (role) {
            updateData.role_id = role.id
        }
    }
    
    await conn('users').where({ id }).update(updateData)
    return { success: true, message: 'User updated successfully' }
}

export async function deleteUser(id) {
    await conn('users').where({ id }).del()
    return { success: true, message: 'User deleted successfully' }
}
