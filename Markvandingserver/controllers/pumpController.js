exports.getInactivePumps = (req, res) => {
    Pump.getInactivePumps((err, Pumps) => {
        if(err){
            res.send(err)
        }
        res.send(Pumps)
    })
}
exports.getActivePumps = (req, res) => {
    Pump.getActivePumps((err, Pumps) => {
        if(err){
            res.send(err)
        }
        res.send(Pumps)
    })
}
exports.getAllPumps = (req, res) => {
    Pump.getAllPumps((err, Pumps) => {
        if(err){
            res.send(err)
        }
        res.send(Pumps)
    })
}
exports.updatePumpById = (req, res) => {
    Pump.updatePumpById(req.body.id, new Pump(req.body), (err, Pumps) => {
        if(err){
            res.send(err)
        }
        res.send(Pumps)
    })
}
exports.removePumpById = (req, res) => {
    Pump.removePumpById(req.body.id, (err, id) => {
        if(err){
            res.send(err)
        }
        res.send(id)
    })
}
