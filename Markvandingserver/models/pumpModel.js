    static getInactivePumps(result){
        sql.query("SELECT * FROM markvanding.pumps WHERE active = 0", (err, res) => {
            if(err){
                console.log("Error: ", err)
                result(err, null)
            }
            else{
                result(null, res)
            }
        })
    }
    static getActivePumps(result){
        sql.query("SELECT * FROM markvanding.pumps WHERE active = 1", (err, res) => {
            if(err){
                console.log("Error: ", err)
                result(err, null)
            }
            else{
                result(null, res)
            }
        })
    }
    static getAllPumps(result){
        sql.query("SELECT * FROM markvanding.pumps", (err, res) => {
            if(err){
                console.log("Error: ", err)
                result(err, null)
            }
            else{
                result(null, res)
            }
        })
    }
