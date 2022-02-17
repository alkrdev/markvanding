import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
    const { pid } = req.query
    switch (req.method) {
        case "GET": 
            res.end(`Pump: ${pid}`)
            break;
        case "POST":
            res.end(`Pump: ${pid}`)
            break;
        case "DELETE":
            res.end(`Pump: ${pid}`)
            break;
        case "PUT":
            res.end(`Pump: ${pid}`)
            break;
    }    
}