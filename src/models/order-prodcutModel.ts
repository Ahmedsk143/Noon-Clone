import DBConnection from '../database';
import * as dotenv from 'dotenv';
dotenv.config();

export type OrderProduct = {
    id?: number;
    orderId: number;
    productId: number;
    quantity: number;
};
class OrderProdcutModel {
    async createOrderProduct(order: OrderProduct): Promise<OrderProduct> {
        try {
            const conn = await DBConnection.connect();
            const sql =
                'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *;';
            const result = await conn.query(sql, [
                order.id,
                order.productId,
                order.quantity,
            ]);

            const model = result.rows[0];

            conn.release();
            const orderProduct: OrderProduct = {
                id: model.id,
                orderId: model.order_id,
                productId: model.product_id,
                quantity: model.quantity,
            };
            return orderProduct;
        } catch (err) {
            throw new Error(`Could not add new order. Error: ${err}`);
        }
    }
}
export default new OrderProdcutModel();
