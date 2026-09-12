import { verifyToken } from '../utils/jwt.js'
import {AppError} from '../utils/AppError.js'


export function firstloginMiddleware(req , res , next){
    try{
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            throw new AppError('กรุณาเข้าสู่ระบบ', 401)
        }
         const decoded = verifyToken(token)
         if(decoded.purpose !== 'first_login'){ throw new AppError('ไม่ได้รับอนุญาต' , 403)}
        req.user = decoded
        next()

    }catch(e){
        next(e)
    }
}