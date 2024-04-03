import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../prisma';
 
export default async function (request: VercelRequest, response: VercelResponse) {
  const { id } = request.query;

  if (!id || !(typeof id === "string")) response.status(400).send('Missing id');

  return response.status(200).send(prisma.user.findUnique({
    where: {
      id: id as string,
    },
  }));
}