import { Request, Response, NextFunction, CookieOptions } from 'express';
import createHttpError from 'http-errors';
import User from '../models/user.model.js';
import {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '../helpers/jwt.helper.js';

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 365.25 * 24 * 60 * 60 * 1000,
  path: '/api/account/refreshToken',
  // domain: 'localhost',
};

export async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(' ')[1] ?? '';
    res.locals.user = await verifyAccessToken(token);
    next();
  } catch (error) {
    next();
  }
}

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // data validation pending
    if (await User.findOne({ email: req.body.email })) {
      throw createHttpError.Conflict(
        'This email address is already associated with an account. If this account is yours, you can reset your password.'
      );
    }
    const user = new User(req.body);
    await user.save();
    const accessToken = await signAccessToken(user._id.toString());
    const refreshToken = await signRefreshToken(user._id.toString());
    res
      .cookie('refreshToken', refreshToken, cookieOptions)
      .status(201)
      .json({ accessToken });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.isValidPassword(password as string))) {
      throw createHttpError.Unauthorized('Incorrect email or password.');
    }
    const accessToken = await signAccessToken(user._id.toString());
    const refreshToken = await signRefreshToken(user._id.toString());
    res
      .cookie('refreshToken', refreshToken, cookieOptions)
      .json({ accessToken });
  } catch (error) {
    next(error);
  }
}

export function logout(req: Request, res: Response) {
  res.clearCookie('refreshToken', { ...cookieOptions, maxAge: 0 }).send();
}

export async function refreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await verifyRefreshToken(req.cookies.refreshToken);
    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);
    res
      .cookie('refreshToken', refreshToken, cookieOptions)
      .json({ accessToken });
  } catch (error) {
    res.clearCookie('refreshToken', { ...cookieOptions, maxAge: 0 });
    next(error);
  }
}
