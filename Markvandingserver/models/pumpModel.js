var sql = require("../db.js")
class Pump{
    constructor(pump){
        this.id = pump.id
        this.name = pump.name
        this.number = pump.number
        this.active = pump.active
        this.startcode = pump.startcode
        this.stopcode = pump.stopcode
    }

    static getInactivePumps(result){
        sql.query("SELECT * FROM markvanding.pumps WHERE active = 0", (err, res) => {
            if(err){
                console.log("Error: ", err)
                result(err, null)
            }
            else{
                result(null, res)
            }
        })
    }

    static getActivePumps(result){
        sql.query("SELECT * FROM markvanding.pumps WHERE active = 1", (err, res) => {
            if(err){
                console.log("Error: ", err)
                result(err, null)
            }
            else{
                result(null, res)
            }
        })
    }

    static getAllPumps(result){
        sql.query("SELECT * FROM markvanding.pumps", (err, res) => {
            if(err){
                console.log("Error: ", err)
                result(err, null)
            }
            else{
                result(null, res)
            }
        })
    }

    static updatePumpById(id, updatedPump, result){
        console.log(id)
        console.log(updatedPump)
        console.log(result)
        sql.query("UPDATE markvanding.pumps SET ? WHERE id = ?", [updatedPump, id], (err, res) => {
            if(err){
                console.log("Error: ", err)
                result(err, null)
            }
            else{
                result(null, res)
            }
        })
    }

    static removePumpById(id, result){
        console.log(id)
        console.log(result)
        sql.query("REMOVE FROM markvanding.pumps WHERE id = ?", id, (err, res) => {
            if(err){
                console.log("Error: ", err)
                result(err, null)
            }
            else{
                result(null, res)
            }
        })
    }

    static createPump(createdPump, result){
        console.log(createdPump)
        console.log(result)
        sql.query("INSERT INTO markvanding.pumps SET ?", createdPump, (err, res) => {
            if(err){
                console.log("Error: ", err)
                result(err, null)
            }
            else{
                result(null, res)
            }
        })
    }
}

module.exports = Pump