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

export async function changepassword(req,res,next){
    try{
        // console.log(req.user)
        const {password} = req.body
        const {id} = req.user.user
        const result = await authService.changpassword(id , password)
        res.json(result)
    }catch(e){
        next(e)
    }
}
export async function me(req,res , next){
    try{
        // console.log(req.user)
        res.json(req.user)
    }catch(e){
        next(e)
    }
}