import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default async function auth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(' ')[1] ?? '';
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user) => {
    if (!err) {
      res.locals.user = user;
    }
    next();
  });
}
