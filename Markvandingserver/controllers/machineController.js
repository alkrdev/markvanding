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

exports.getActiveMachines = (req, res) => {
    Machine.getActiveMachines((err, machines) => {
        if(err){
            res.send(err)
        }
        res.send(machines)
    })
}
exports.getAllMachines = (req, res) => {
    Machine.getAllMachines((err, machines) => {
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
exports.removeMachineById = (req, res) => {
    Machine.removeMachineById(req.body.id, (err, id) => {
        if(err){
            res.send(err)
        }
        res.send(id)
    })
}
exports.createMachine = (req, res) => {
    Machine.createMachine(new Machine(req.body), (err, machines) => {
        if(err){
            res.send(err)
        }
        res.send(machines)
    })
}