import bcrypt from 'bcrypt'

export  function comparepassword(password , hashedpassword){
    return bcrypt.compare(password, hashedpassword)
}

export  function hashpassword(password , costFactor = 10){
    return bcrypt.hash(password , costFactor)
}