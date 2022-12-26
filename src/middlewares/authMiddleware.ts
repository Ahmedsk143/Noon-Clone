import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from '../models/userModel';
const AuthMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (req.headers.authorization) {
        try {
            if (!req.headers.authorization) {
                res.status(401).json({
                    status: 'Failure',
                    message: 'authorization header required',
                });
            }
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(
                token,
                process.env.PRIVATE_KEY as string
            ) as User;
            req.userId = '' + decoded.id;
            req.email = decoded.email;
        } catch (e) {
            res.json({ error: 'Invalid token' });
        }
    }
    next();
};
export default AuthMiddleware;
