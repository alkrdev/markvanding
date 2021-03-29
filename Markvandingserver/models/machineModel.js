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
        sql.query("SELECT * FROM markvanding.machines WHERE active = 1 ORDER BY time ASC", (err, res) => {
            if(err){
                console.log("Error: ", err)
                result(err, null)
            }
            else{
                // var stillgoing = res.filter(x => new Date() < new Date(x.time))
                // var expired = res.filter(x => new Date() > new Date(x.time))

                // if (expired.length > 0) {
                //     expired.forEach(element => {
                //         sql.query("UPDATE markvanding.pumps SET active = 0 WHERE name = ?", element.pumpname, (err, res) => {
                //             if(err){
                //                 console.log("Error: ", err)
                //                 result(err, null)
                //             }
                //         })
                //         element.active = 0
                //         element.time = null
                //         element.pumpname = null
                //         sql.query("UPDATE markvanding.machines SET ? WHERE id = ?", [element, element.id], (err, res) => {
                //             if(err){
                //                 console.log("Error: ", err)
                //                 result(err, null)
                //             }
                //         })
                //     });
                // }
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
        sql.query("DELETE FROM markvanding.machines WHERE id = ?", id, (err, res) => {
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

module.exports = Machine