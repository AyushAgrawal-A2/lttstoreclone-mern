import createHttpError from 'http-errors';
import User from '../models/user.model.js';
import redisClient from '../helpers/redis.helper.js';
import { signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken, } from '../helpers/jwt.helper.js';
const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 365.25 * 24 * 60 * 60 * 1000,
    path: '/api/account/refreshToken',
    // domain: 'localhost',
};
async function generateTokens(id) {
    const accessToken = await signAccessToken(id);
    const refreshToken = await signRefreshToken(id);
    await redisClient.set(id, refreshToken);
    return { accessToken, refreshToken };
}
export async function auth(req, res, next) {
    try {
        const token = req.headers.authorization?.split(' ')[1] ?? '';
        res.locals.user = await verifyAccessToken(token);
        next();
    }
    catch (error) {
        next();
    }
}
export async function register(req, res, next) {
    try {
        // validate input
        if (await User.findOne({ email: req.body.email })) {
            throw createHttpError.Conflict('This email address is already associated with an account. If this account is yours, you can reset your password.');
        }
        const user = new User(req.body);
        await user.save();
        const { accessToken, refreshToken } = await generateTokens(user.id);
        res
            .cookie('refreshToken', refreshToken, cookieOptions)
            .status(201)
            .json({ accessToken });
    }
    catch (error) {
        next(error);
    }
}
export async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.isValidPassword(password))) {
            throw createHttpError.Unauthorized('Incorrect email or password.');
        }
        const { accessToken, refreshToken } = await generateTokens(user.id);
        res
            .cookie('refreshToken', refreshToken, cookieOptions)
            .json({ accessToken });
    }
    catch (error) {
        next(error);
    }
}
export function logout(req, res) {
    res.clearCookie('refreshToken', { ...cookieOptions, maxAge: 0 }).send();
}
export async function refreshToken(req, res, next) {
    try {
        const user = await verifyRefreshToken(req.cookies.refreshToken);
        const currentToken = await redisClient.GET(user.id);
        if (currentToken !== req.cookies.refreshToken) {
            throw createHttpError.Unauthorized();
        }
        const { accessToken, refreshToken } = await generateTokens(user.id);
        res
            .cookie('refreshToken', refreshToken, cookieOptions)
            .json({ accessToken });
    }
    catch (error) {
        res.clearCookie('refreshToken', { ...cookieOptions, maxAge: 0 });
        next(error);
    }
}
//# sourceMappingURL=account.controller.js.map