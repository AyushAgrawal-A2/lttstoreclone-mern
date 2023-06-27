import express from 'express';
import { register, login } from '../controllers/user.controller.js';
const router = express.Router();
router.get('/', (req, res) => {
    if (!res.locals.user) {
        return res.sendStatus(401);
    }
    return res.send(`Hello ${res.locals.user.email}`);
});
router.post('/register', register);
router.post('/login', login);
export default router;
//# sourceMappingURL=account.route.js.map