import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    return res.status(401).send({ message: 'Not Authencticated' });
  }
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;

    req.currentUser = payload;
  } catch (e) {
    console.error(e);
    return res.status(401).send({ message: 'Not Authencticated' });
  }

  next();
};
