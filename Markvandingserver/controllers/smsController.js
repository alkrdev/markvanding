"use strict"

var SMS = require("../models/smsModel.js")

exports.sendSingleMessage = (req, res) => {
    SMS.sendSingleMessage(req.body.message, req.body.number)
}