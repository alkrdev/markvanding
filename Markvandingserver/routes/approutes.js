module.exports = (app) => {
    var machines = require("../controllers/machineController.js")
    var pumps = require("../controllers/pumpController.js")
    var sms = require("../controllers/smsController.js")
    var notes = require("../controllers/noteController.js")

    app.route("/inactivemachines")
        .get(machines.getInactiveMachines)

    app.route("/activemachines")
        .get(machines.getActiveMachines)

    app.route("/allmachines")
        .get(machines.getAllMachines)

    app.route("/updatemachine")
        .post(machines.updateMachineById)

    app.route("/removemachine")
        .post(machines.removeMachineById)
    
    app.route("/createmachine")
        .post(machines.createMachine)

    app.route("/inactivepumps")
        .get(pumps.getInactivePumps)

    app.route("/activepumps")
        .get(pumps.getActivePumps)

    app.route("/allpumps")
        .get(pumps.getAllPumps)

    app.route("/updatepump")
        .post(pumps.updatePumpById)

    app.route("/removepump")
        .post(pumps.removePumpById)
    
    app.route("/createpump")
        .post(pumps.createPump)

    app.route("/sendsms")
        .post(sms.sendSingleMessage)

    app.route("/createnote")
        .post(notes.createMaintenanceNote)

    app.route("/getnotes")
        .get(notes.getNotes)

    app.route("/removenote")
        .post(notes.removeNoteById)
}