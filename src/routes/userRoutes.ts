import express from 'express';
import user from '../controllers/userController';
import AuthMiddleware from '../middlewares/authMiddleware';
const userRoute = express.Router();
userRoute.post('/', user.registerNewUser);
userRoute.post('/signin', user.authenticateUser);
userRoute.get('/profile', AuthMiddleware, user.getUserData);
userRoute.post('/change/password', AuthMiddleware, user.changePassword);
userRoute.post('/change/name', AuthMiddleware, user.changeName);

// For development
userRoute.get('/', user.getAllUsers);
userRoute.get('/:id', user.getUserById);
userRoute.delete('/', user.deleteAllUsers);
userRoute.delete('/:id', user.deleteUserById);

export default userRoute;
