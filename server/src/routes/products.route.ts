import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get('/:name', (req: Request, res: Response) => {
  res.send('Product - ' + req.params.name);
});

export default router;
