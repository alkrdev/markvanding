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
