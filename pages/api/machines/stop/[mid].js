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
            const { id, pumpname } = req.body;

            await prisma.machine.update({
                where: { id: id },
                data: {
                    pumpname: null,
                    time: null,
                    active: false
                }
            })

            await prisma.pump.update({
                where: { name: pumpname },
                data: { active: false }
            })
            
            var machines = await prisma.machine.findMany()
            res.json(machines)
            break;
    }    
}
