import express, { Router, Request, Response } from 'express';
import createHttpError from 'http-errors';
import {
  register,
  login,
  logout,
  refreshToken,
} from '../controllers/account.controller.js';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  if (!res.locals.user) {
    throw createHttpError.Unauthorized();
  }
  res.send(`Hello ${res.locals.user.id}`);
});
router.post('/register', register);
router.post('/login', login);
router.delete('/logout', logout);
router.post('/refreshToken', refreshToken);

export default router;
