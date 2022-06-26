import jwt from 'jsonwebtoken';
import prisma from './prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';

const validateRoute =
  (
    handler: (
      req: NextApiRequest,
      res: NextApiResponse<any>,
      user: User
    ) => void
  ) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { X_ACCESS_TOKEN: token } = req.cookies;

    if (!token) {
      res.status(401);
      res.json({ error: 'Not Authorized' });
      return;
    }

    let user: User;

    try {
      const { id } = jwt.verify(token, 'x-music-app-secret') as User;

      user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) throw new Error('User not found');
    } catch (error) {
      res.status(401);
      res.json({ error: 'Not Authorized' });
      return;
    }

    return handler(req, res, user);
  };

const validateToken = (token: string) => {
  const user = jwt.verify(token, 'x-music-app-secret');

  return user;
};

export { validateRoute };
