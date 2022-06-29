import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const artists = await prisma.artist.findMany({});

  if (!artists) {
    throw new Error('No artists found');
  }

  res.status(200).json(artists);
};
