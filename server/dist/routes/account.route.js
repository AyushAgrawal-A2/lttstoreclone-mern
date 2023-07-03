import express from 'express';
import createHttpError from 'http-errors';
import { register, login, logout, refreshToken, } from '../controllers/account.controller.js';
const router = express.Router();
router.get('/', (req, res) => {
    if (!res.locals.user) {
        throw createHttpError.Unauthorized();
    }
    res.send(`Hello ${res.locals.user.id}`);
});
router.post('/register', register);
router.post('/login', login);
router.delete('/logout', logout);
router.get('/refreshToken', refreshToken);
export default router;
//# sourceMappingURL=account.route.js.map