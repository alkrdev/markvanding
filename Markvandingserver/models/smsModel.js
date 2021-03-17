var sql = require("../db.js")
class SMS{
    constructor(data){
        this.number = data.number
        this.message = data.message
    }

    static sendSingleMessage(message, number)
    {
        console.log(message)
        console.log(number)
        var https = require('follow-redirects').https;

        var options = {
            'method': 'POST',
            'hostname': 'api.sms.to',
            'path': '/sms/send',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer k0KO9LoretzsgsWv44Fzx9rya92tqm3a'
            },
            'maxRedirects': 20
        };

        var req = https.request(options, function (res) {
            var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function (chunk) {
                var body = Buffer.concat(chunks);
                console.log(body.toString());
            });

            res.on("error", function (error) {
                console.error(error);
            });
        });

        console.log(message)
        console.log(number)
        //var postData =  "{\n    \"message\": \"" + message + "\",\n    \"to\": \"" + number + "\"}";

        //req.write(postData);

        //req.end();
    }

}

module.exports = SMS

