import prisma from '../../../../lib/prisma'

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
            
            const { pumpid } = req.body;

            var pump = await prisma.pump.update({
                where: { id: pumpid },
                data: { active: true }
            })

            await prisma.machine.update({
                where: { 
                    id: Number(mid)
                },
                data: {
                    pumpname: pump.name,
                    active: true
                }
            })

            var machines = await prisma.machine.findMany()
            res.json(machines)
            break;
    }    
}