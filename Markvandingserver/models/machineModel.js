    static getInactiveMachines(result){
        sql.query("SELECT", (err, res) => {
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
