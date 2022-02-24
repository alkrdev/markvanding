import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
    const { mid } = req.query
    switch (req.method) {
        case "GET": 
            var machine = await prisma.machine.findUnique({
                where: {
                    id: Number(mid)
                },
                include: {maintenances: true}
            })
            res.json(machine)
            
            break;
        case "POST":
            res.end(`Machine: ${mid}`)
            break;
        case "DELETE":
            res.end(`Machine: ${mid}`)
            break;
        case "PUT":
            const { id, time } = req.body
            var machine = await prisma.machine.update({
                where: {
                    id: id
                },
                data: {
                    time: new Date(time)
                }
                
            })
            res.json(machine)
            
            break;
    }    
}