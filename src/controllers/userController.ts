import { Request, Response } from 'express';
import UserModel, { User } from '../models/userModel';
import * as jwt from 'jsonwebtoken';
import userModel from '../models/userModel';
class userController {
    static getAllUsers = async (_req: Request, res: Response) => {
        try {
            const result = await UserModel.getAll();
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: `An error occured ${err}` });
        }
    };
    static getUserById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const result = await UserModel.getById(id);
            res.send(result);
        } catch (err) {
            res.status(400).json({ error: `An error occured ${err}` });
        }
    };
    static getUserData = async (req: Request, res: Response) => {
        try {
            const id = req.userId;
            const result = await UserModel.getById(id);

            res.status(200).json(result);
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
            res.status(400).json({ error: `An error occured ${err}` });
        }
    };
    static deleteAllUsers = async (req: Request, res: Response) => {
        try {
            await UserModel.deleteAll();
            res.json({ message: 'All users have been deleted' });
        } catch (err) {
            res.status(400).json({ error: `An error occured ${err}` });
        }
    };

    static registerNewUser = async (req: Request, res: Response) => {
        try {
            const user: User = req.body;
            if (await userModel.checkEmail(user)) {
                res.status(400).json({ error: 'Email already exists' });
            } else {
                await UserModel.addNew(user);
                res.status(201).json({
                    message: 'User has been created, Please signin',
                });
            }
        } catch (err) {
            console.log(err);
            res.status(400).json({ error: `an error occurred ${err}` });
        }
    };
    static changePassword = async (req: Request, res: Response) => {
        try {
            const id = req.userId;
            const currentPassword = req.body.currentPassword;
            const newPassword = req.body.newPassword;
            if (await userModel.checkPassword(id, currentPassword)) {
                await userModel.changePass(id, newPassword);
                res.status(201).json('Password has been changed');
            } else {
                res.status(403).json('Current password is incorrect');
            }
        } catch (e) {
            res.status(400).json({ error: `en error occurred: ${e}` });
        }
    };
    static changeName = async (req: Request, res: Response) => {
        try {
            const id = req.userId;
            const firstName = req.body.firstName;
            const lastName = req.body.lastName;
            await userModel.changeName(id, firstName, lastName);
            res.status(200).json('Data has been updated successfully');
        } catch (e) {
            res.status(400).json({ error: `en error occurred: ${e}` });
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
            res.status(400).json({ error: `An error occured ${err}` });
        }
    };
}
export default userController;
