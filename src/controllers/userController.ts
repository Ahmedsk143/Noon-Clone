import { Request, Response } from 'express';
import UserModel, { User } from '../models/userModel';
import * as jwt from 'jsonwebtoken';
class userController {
    static getAllUsers = async (_req: Request, res: Response) => {
        try {
            const result = await UserModel.getAll();
            res.json(result);
        } catch (err) {
            res.status(400).json({ err });
        }
    };
    static getUserById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const result = await UserModel.getById(id);
            res.send(result);
        } catch (err) {
            res.status(400).json({ err });
        }
    };
    static getUserData = async (req: Request, res: Response) => {
        try {
            const id = req.userId;
            const result = await UserModel.getById(id);
            res.send(result);
        } catch (err) {
            res.status(400).json({ error: `An error occured ${err}` });
        }
    };
    static deleteUserById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            await UserModel.deleteById(id);
            res.json({ message: 'User has been deleted' });
        } catch (err) {
            res.status(400).json({ err });
        }
    };
    static registerNewUser = async (req: Request, res: Response) => {
        try {
            const user: User = req.body;
            await UserModel.addNew(user);
            res.status(201).json({
                message: 'User has been created, Please signin',
            });
        } catch (err) {
            console.log(err);
            res.status(400).json({ error: `An error occured: ${err}` });
        }
    };
    static authenticateUser = async (req: Request, res: Response) => {
        try {
            const authenicated = await UserModel.authenticate(
                req.body.email,
                req.body.password
            );
            if (authenicated) {
                const tokenData = {
                    id: authenicated.id,
                    firstName: authenicated.firstName,
                    lastName: authenicated.lastName,
                    email: authenicated.email,
                };

                const token = jwt.sign(
                    tokenData,
                    process.env.PRIVATE_KEY as string
                );
                res.status(200).json({ token });
            } else res.status(400).json({ message: 'Wrong email or password' });
        } catch (err) {
            res.status(400).json({ err });
        }
    };
}
export default userController;
