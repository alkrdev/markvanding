exports.getInactivePumps = (req, res) => {
    Pump.getInactivePumps((err, Pumps) => {
        if(err){
            res.send(err)
        }
        res.send(Pumps)
    })
}
