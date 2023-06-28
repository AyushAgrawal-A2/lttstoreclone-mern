import jwt from 'jsonwebtoken';
export function signAccessToken(id) {
    return new Promise((res, rej) => {
        jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '30m',
            issuer: 'https://lttstoreclone.vercel.app/',
        }, (err, token) => {
            if (err)
                rej(err);
            res(token);
        });
    });
}
export function verifyAccessToken(token) {
    return new Promise((res, rej) => {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            if (err)
                rej(err);
            res(data);
        });
    });
}
export function signRefreshToken(id) {
    return new Promise((res, rej) => {
        jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1y',
            issuer: 'https://lttstoreclone.vercel.app/',
        }, (err, token) => {
            if (err)
                rej(err);
            res(token);
        });
    });
}
export function verifyRefreshToken(token) {
    return new Promise((res, rej) => {
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
            if (err)
                rej(err);
            res(data);
        });
    });
}
//# sourceMappingURL=jwt.helper.js.map