import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../prisma';
 
export default async function (request: VercelRequest, response: VercelResponse) {
  const { id } = request.query;

  if (!id) response.status(400).send('Missing id');

  return response.status(200).json(await prisma.user.findUnique({
    where: {
      discordId: id as string,
    },
  }));
}