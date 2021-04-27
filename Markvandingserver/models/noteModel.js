var sql = require("../db.js")
class Note{
    constructor(note){
        this.id = note.id
        this.machineid = note.machineid
        this.time = note.time
        this.note = note.note
    }

    static createMaintenanceNote(createdNote, result){
        console.log(createdNote)
        sql.query("INSERT INTO markvanding.maintenance SET ?", createdNote, (err, res) => {
            if(err){
                console.log("Error: ", err)
                result(err, null)
            }
            else{
                result(null, res)
            }
        })
    }

    static getNotes(result){
        sql.query("SELECT * FROM markvanding.maintenance ORDER BY time DESC", (err, res) => {
            if(err){
                console.log("Error: ", err)
                result(err, null)
            }
            else{
                result(null, res)
            }
        })
    }

    static removeNoteById(id, result){
        console.log(id)
        sql.query("DELETE FROM markvanding.notes WHERE id = ?", id, (err, res) => {
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
    
module.exports = Note