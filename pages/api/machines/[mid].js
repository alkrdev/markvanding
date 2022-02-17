import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
    const { mid } = req.query
    switch (req.method) {
        case "GET": 
            res.end(`Machine: ${mid}`)
            break;
        case "POST":
            res.end(`Machine: ${mid}`)
            break;
        case "DELETE":
            res.end(`Machine: ${mid}`)
            break;
        case "PUT":
            res.end(`Machine: ${mid}`)
            break;
    }    
}