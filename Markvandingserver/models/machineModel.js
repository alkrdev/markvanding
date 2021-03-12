var sql = require("../db.js")
class Machine{
    constructor(machine){
        this.id = machine.id
        this.pumpname = machine.pumpname
        this.time = machine.time
        this.active = machine.active
    }

    static getInactiveMachines(result){
        sql.query("SELECT * FROM markvanding.machines WHERE active = 0", (err, res) => {
            if(err){
                console.log("Error: ", err)
                result(err, null)
            }
            else{
                result(null, res)
            }
        })
    }

    static getActiveMachines(result){
        sql.query("SELECT * FROM markvanding.machines WHERE active = 1", (err, res) => {
            if(err){
                console.log("Error: ", err)
                result(err, null)
            }
            else{
                result(null, res)
            }
        })
    }

    static getAllMachines(result){
        sql.query("SELECT * FROM markvanding.machines", (err, res) => {
            if(err){
                console.log("Error: ", err)
                result(err, null)
            }
            else{
                result(null, res)
            }
        })
    }

    static updateMachineById(id, updatedMachine, result){
        console.log(id)
        console.log(updatedMachine)
        console.log(result)
        sql.query("UPDATE markvanding.machines SET ? WHERE id = ?", [updatedMachine, id], (err, res) => {
            if(err){
                console.log("Error: ", err)
                result(err, null)
            }
            else{
                result(null, res)
            }
        })
    }
    static removeMachineById(id, result){
        console.log(id)
        console.log(result)
        sql.query("REMOVE FROM markvanding.machines WHERE id = ?", id, (err, res) => {
            if(err){
                console.log("Error: ", err)
                result(err, null)
            }
            else{
                result(null, res)
            }
        })
    }
    static createMachine(createdMachine, result){
        console.log(createdMachine)
        console.log(result)
        sql.query("INSERT INTO markvanding.machines SET ?", createdMachine, (err, res) => {
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
