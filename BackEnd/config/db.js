require("dotenv").config();
const mysql=require('mysql2')

const db=mysql.createConnection({
    host:process.env.DP_HOST,
    user:process.env.DP_USER,
    password:process.env.DP_PASSWORD,
    database:process.env.DP_NAME
})

module.exports=db

