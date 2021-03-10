const express = require("express")
const app = express()
const bodyparser = require("body-parser")
const cors = require("cors")
const port = process.env.PORT || 3000

app.use(cors())
app.use(bodyparser.urlencoded({
    extended: true
}))
app.use(bodyparser.json())

app.listen(port)
console.log("SERVER STARTET")

var routes = require("./routes/approutes")

routes(app)