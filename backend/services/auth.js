import conn from '../db/db.js'
import { AppError } from '../utils/AppError.js'
import { hashpassword, comparepassword } from '../utils/password.js'
import { generateToken } from '../utils/jwt.js'

export async function register(name, email, department) {
    if (!email || !name){
        throw new AppError('Email and password are required.' , 400)
    }
    const examine = await conn('users')
        .where({ email })
        .first()

    if (examine) {throw new AppError('มีผู้ใช้งานแล้ว', 409)}

    const password_hash = await hashpassword('123456')

    await conn('users').insert({
        name,
        email,
        password_hash,
        department,
    })

    return { success: true, message: 'complete'}
}


export async function login(email, password) {

    const user = await conn('users')
        .where({ email })
        .first()

    if (!user) {
        throw new AppError('Email or password is incorrect', 401)
    }

    const isMatch = await comparepassword( password,user.password_hash)

    if (!isMatch) { throw new AppError('Email or password is incorrect', 401) }

    const purpose = user.must_change_password ? 'first_login' : 'access'

    const token = generateToken({
        user: { id : user.id , role : user.role},
        purpose
    })

    return { message: 'Login success', token,purpose}
}

export async function changpassword( id ,password){
    // console.log(id , password)
    const password_hash = await hashpassword(password)

    const update = await conn('users').where({id}).update({password_hash , must_change_password : false })
    return { message: 'ChangePassword success'}
}