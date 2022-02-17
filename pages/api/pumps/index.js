import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const pumps = await prisma.pump.findMany()
  res.json(pumps)
}