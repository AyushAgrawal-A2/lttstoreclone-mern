import express, { Router, Request, Response } from 'express';
import { getBlog, getBlogCards } from '../helpers/blogs.helper.js';
import createHttpError from 'http-errors';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const page = parseInt((req.query.page as string) ?? 1);
  const perPage = parseInt((req.query.perPage as string) ?? 12);
  const blogCards = getBlogCards(page, perPage);
  res.send({ blogCards });
});

router.get('/:blogPath', (req: Request, res: Response) => {
  const blogPath = req.params.blogPath;
  const blog = getBlog(blogPath);
  if (blog) res.send(blog);
  else res.send(createHttpError.NotFound());
});

export default router;
