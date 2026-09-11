import knex from 'knex'
import dotenv from 'dotenv'
dotenv.config()

const conn = knex({
    client:'mysql2',
    connection:{
    host: process.env.DB_HOST || 'localhost' , 
    port: process.env.DB_PORT || 3306 ,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '123456' ,
    database: process.env.DB_NAME || 'databasePAO' ,
    waitForConnections: true , 
    connectionLimit: 10 , 
    charset : "utf8mb4",
    },pool:{ min : 0 , max: 10} 
})

conn.raw('SELECT 1') 
    .then(() =>{
    console.log('✅ Database connected successfully')
    }).catch(error =>{
        console.log('❌ Database connection failed:', error.message)
    })


export default conn 
