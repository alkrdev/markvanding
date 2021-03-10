module.exports = (app) => {
    var machines = require("../controllers/machineController")

    app.route("/inactivemachines")
        .get(machines.getInactiveMachines)
}