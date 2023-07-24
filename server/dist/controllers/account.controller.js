var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function generateTokens(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const accessToken = yield signAccessToken(id);
        const refreshToken = yield signRefreshToken(id);
        yield redisClient.set(id, refreshToken);
        return { accessToken, refreshToken };
    });
}
export function auth(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_b = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) !== null && _b !== void 0 ? _b : '';
            res.locals.user = yield verifyAccessToken(token);
            next();
        }
        catch (error) {
            next();
        }
    });
}
export function register(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // validate input
            if (yield User.findOne({ email: req.body.email })) {
                throw createHttpError.Conflict('This email address is already associated with an account. If this account is yours, you can reset your password.');
            }
            const user = new User(req.body);
            yield user.save();
            const { accessToken, refreshToken } = yield generateTokens(user.id);
            res
                .cookie('refreshToken', refreshToken, cookieOptions)
                .status(201)
                .json({ accessToken });
        }
        catch (error) {
            next(error);
        }
    });
}
export function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield User.findOne({ email });
            if (!user || !(yield user.isValidPassword(password))) {
                throw createHttpError.Unauthorized('Incorrect email or password.');
            }
            const { accessToken, refreshToken } = yield generateTokens(user.id);
            res
                .cookie('refreshToken', refreshToken, cookieOptions)
                .json({ accessToken });
        }
        catch (error) {
            next(error);
        }
    });
}
export function logout(req, res) {
    res.clearCookie('refreshToken', Object.assign(Object.assign({}, cookieOptions), { maxAge: 0 })).send();
}
export function refreshToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield verifyRefreshToken(req.cookies.refreshToken);
            const currentToken = yield redisClient.GET(user.id);
            if (currentToken !== req.cookies.refreshToken) {
                throw createHttpError.Unauthorized();
            }
            const { accessToken, refreshToken } = yield generateTokens(user.id);
            res
                .cookie('refreshToken', refreshToken, cookieOptions)
                .json({ accessToken });
        }
        catch (error) {
            res.clearCookie('refreshToken', Object.assign(Object.assign({}, cookieOptions), { maxAge: 0 }));
            next(error);
        }
    });
}
//# sourceMappingURL=account.controller.js.map