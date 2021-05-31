"use strict"

var User = require("../models/userModel.js")

exports.authenticate = (req, res) => {
    User.authenticate(req.body.email, req.body.password)
}