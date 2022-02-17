import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const machines = await prisma.machine.findMany()
  res.json(machines)
}