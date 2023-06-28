import jwt, { JwtPayload } from 'jsonwebtoken';

export function signAccessToken(id: string): Promise<string> {
  return new Promise((res, rej) => {
    jwt.sign(
      { id },
      process.env.ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: '30m',
        issuer: 'https://lttstoreclone.vercel.app/',
      },
      (err, token) => {
        if (err) rej(err);
        res(token as string);
      }
    );
  });
}

export function verifyAccessToken(token: string): Promise<JwtPayload> {
  return new Promise((res, rej) => {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
      (err, data) => {
        if (err) rej(err);
        res(data as JwtPayload);
      }
    );
  });
}

export function signRefreshToken(id: string): Promise<string> {
  return new Promise((res, rej) => {
    jwt.sign(
      { id },
      process.env.REFRESH_TOKEN_SECRET as string,
      {
        expiresIn: '1y',
        issuer: 'https://lttstoreclone.vercel.app/',
      },
      (err, token) => {
        if (err) rej(err);
        res(token as string);
      }
    );
  });
}

export function verifyRefreshToken(token: string): Promise<JwtPayload> {
  return new Promise((res, rej) => {
    jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET as string,
      (err, data) => {
        if (err) rej(err);
        res(data as JwtPayload);
      }
    );
  });
}
