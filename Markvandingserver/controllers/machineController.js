"use strict"

var Machine = require("../models/machineModel.js")

exports.getInactiveMachines = (req, res) => {
    Machine.getInactiveMachines((err, machines) => {
        if(err){
            res.send(err)
        }
        res.send(machines)
    })
}

exports.updateMachineById = (req, res) => {
    Machine.updateMachineById(req.body.id, new Machine(req.body), (err, machines) => {
        if(err){
            res.send(err)
        }
        res.send(machines)
    })
}