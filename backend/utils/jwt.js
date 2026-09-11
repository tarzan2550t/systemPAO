import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export function generateToken(payload, expiresIn = '1h') {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn }
    )
}

export function verifyToken(token) {
    return jwt.verify(
        token,
        process.env.JWT_SECRET
    )
}