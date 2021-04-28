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
        const fetch = require("node-fetch"); // npm install node-fetch
        const util = require("util");

        async function sendSMS() {
        const payload = {
            sender: "23727415",
            message: message,
            recipients: [
            { msisdn: number },
            ],
        };

        const apiToken = "hzWHQavUTHe6c0D6QaLyElvkCYp6c4Wbr5nYw6RVHV1pQCsNSMZnv204wYsNFqF_";
        const encodedAuth = Buffer.from(`${apiToken}:`).toString("base64");

        const resp = await fetch("https://gatewayapi.com/rest/mtsms", {
            method: "post",
            body: JSON.stringify(payload),
            headers: {
            Authorization: `Basic ${encodedAuth}`,
            "Content-Type": "application/json",
            },
        });
        const json = await resp.json()
        console.log(util.inspect(json, {showHidden: false, depth: null}));
        if (resp.ok) {
            console.log("congrats! messages are on their way!");
        } else {
            console.log("oh-no! something went wrong...");
        }
        }

        sendSMS();
    }

}

module.exports = SMS

