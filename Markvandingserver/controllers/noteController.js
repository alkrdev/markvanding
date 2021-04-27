"use strict"

var Note = require("../models/noteModel.js")

exports.createMaintenanceNote = (req, res) => {
    Note.createMaintenanceNote(new Note(req.body), (err, notes) => {
        if(err){
            res.send(err)
        }
        res.send(notes)
    })
}

exports.getNotes = (req, res) => {
    Note.getNotes((err, notes) => {
        if(err){
            res.send(err)
        }
        res.send(notes)
    })
}

exports.removeNoteById = (req, res) => {
    console.log(body.id)
    Note.removeNoteById(req.body.id, (err, id) => {
        if(err){
            res.send(err)
        }
        res.send(id)
    })
}