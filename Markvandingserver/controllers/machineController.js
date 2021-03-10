exports.getInactiveMachines = (req, res) => {
    Machine.getInactiveMachines((err, machines) => {
        if(err){
            res.send(err)
        }
        res.send(machines)
    })
}
