var mysql = require("mysql")
var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Jakob05082002",
    database: "markvanding"
})
console.log("DATABASE STARTET")

module.exports = pool