var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
export function register(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password, firstName, lastName } = req.body;
            // data validation pending
            if (yield User.findOne({ email })) {
                throw createHttpError.Conflict('This email address is already associated with an account. If this account is yours, you can reset your password.');
            }
            const hashedPassword = yield bcrypt.hash(password, 10);
            const user = yield User.create({
                email,
                password: hashedPassword,
                firstName,
                lastName,
            });
            const token = createToken(user._id.toString());
            res.status(201).json(token);
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
            if (!user || !(yield bcrypt.compare(password, user.password))) {
                throw createHttpError.BadRequest('Incorrect email or password.');
            }
            const token = createToken(user.id);
            res.status(201).json(token);
        }
        catch (error) {
            next(error);
        }
    });
}
function createToken(id) {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 30,
    });
}
//# sourceMappingURL=user.controller.js.map