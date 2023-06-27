import express, { Router, Request, Response } from 'express';
import { register, login } from '../controllers/user.controller.js';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  if (!res.locals.user) {
    return res.sendStatus(401);
  }
  return res.send(`Hello ${res.locals.user.email}`);
});
router.post('/register', register);
router.post('/login', login);

export default router;
