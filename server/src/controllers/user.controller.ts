import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password, firstName, lastName } = req.body;
    // data validation pending
    if (await User.findOne({ email })) {
      throw createHttpError.Conflict(
        'This email address is already associated with an account. If this account is yours, you can reset your password.'
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    const token = createToken(user._id.toString());
    res.status(201).json(token);
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw createHttpError.BadRequest('Incorrect email or password.');
    }
    const token = createToken(user.id);
    res.status(201).json(token);
  } catch (error) {
    next(error);
  }
}

function createToken(id: string) {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: 30,
  });
}
