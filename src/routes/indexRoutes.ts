import express from 'express';
import orderRoutes from './orderRoutes';
import productRoutes from './productRoutes';
import userRoute from './userRoutes';

const indexRoute = (app: express.Application) => {
    app.get('/', (_req: express.Request, res: express.Response): void => {
        res.status(200).json({ message: 'The root is working' });
    });
    app.use('/api/v1/users', userRoute);
    app.use('/api/v1/products', productRoutes);
    app.use('/api/v1/orders', orderRoutes);
};
export default indexRoute;
