import * as  authService from '../services/auth.js'
import {AppError} from '../utils/AppError.js'

export async function login (req , res , next) {
    try{
    const {email , password} = req.body
    const result = await authService.login(email , password)
    res.json(result)
    }catch(e){
        next(e)
    }
    
}

export async function register(req ,res , next) {
    try{
        const {name ,email , Department} = req.body
        const result = await authService.register(name , email , Department)
        res.json(result)
    }catch(e){
        next(e)
    }
}