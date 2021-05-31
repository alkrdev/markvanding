var sql = require("../db.js")
class User{
    constructor(user){
        this.id = user.id
        this.email = user.email
        this.password = user.password
        this.fullname = user.fullname
    }

    static authenticate(request, response){
        const { email, password } = request.body

        if (email && password) {
            sql.query('SELECT * FROM extusers WHERE email = ? AND password = ?', [email, password], (error, results) => {

                if (error) {
                    console.error("AuthERROR: " + error)
                }

                if (results.length > 0) {
                    response.json({
                        token: GenerateAccessToken(email),
                    })

                    //response.cookie("token", GenerateAccessToken(username))

                    // response.redirect('/choose')
                } else {
                    response.json({ error: "wrongdetails" })
                }
            })
        } else {
            response.send({ error: "missingdetails" })
        }
    }
}
    
module.exports = User