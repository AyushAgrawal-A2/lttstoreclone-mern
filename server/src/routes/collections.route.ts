import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Collection');
});

router.get('/:category', (req: Request, res: Response) => {
  res.send('Collection - ' + req.params.category);
});

export default router;
