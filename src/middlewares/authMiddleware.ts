import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from '../models/userModel';
const AuthMiddleware = (
    req: Request,
    _res: Response,
    next: NextFunction
): void => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(
            token,
            process.env.PRIVATE_KEY as string
        ) as User;
        req.userId = '' + decoded.id;
        req.email = decoded.email;
    }
    next();
};
export default AuthMiddleware;
