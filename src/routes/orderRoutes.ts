import express from 'express';
import order from '../controllers/orderController';
import AuthMiddleware from '../middlewares/authMiddleware';
const orderRoute = express.Router();
orderRoute.get('/', AuthMiddleware, order.getAllOrders);
orderRoute.post('/', AuthMiddleware, order.registerNewOrder);
orderRoute.post('/:id/products', AuthMiddleware, order.addProductToOrder);
orderRoute.get('/current', AuthMiddleware, order.getCurrentOrders);
orderRoute.get('/completed', AuthMiddleware, order.getCompletedOrders);

orderRoute.delete('/:id', AuthMiddleware, order.deleteOrderById);
export default orderRoute;
