import DBConnection from '../database';
import * as dotenv from 'dotenv';
dotenv.config();

export type Order = {
    id?: number;
    active?: boolean;
    userId: number;
};
export type OrderProduct = {
    id?: number;
    quantity: number;
    productId: number;
    orderId: number;
};
class OrderModel {
    async getAll(): Promise<Order[]> {
        try {
            const conn = await DBConnection.connect();
            const sql = 'select * from orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannont get the orders ${err}`);
        }
    }
    async create(order: Order): Promise<Order> {
        try {
            const conn = await DBConnection.connect();
            const sql =
                'insert into orders(user_id, active) values($1, $2) RETURNING *';
            const values: unknown[] = [order.userId];
            if (order.active) {
                values.push(order.active);
            } else {
                values.push(true);
            }
            const result = await conn.query(sql, values);
            conn.release();
            const model: Order = {
                id: result.rows[0].id,
                userId: order.userId,
                active: order.active,
            };
            return model;
        } catch (err) {
            throw new Error(`Cannont add the order ${err}`);
        }
    }
    async addProduct(
        orderId: number,
        productId: number,
        quantity: number
    ): Promise<OrderProduct> {
        try {
            const conn = await DBConnection.connect();
            const sql =
                'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *;';
            const result = await conn.query(sql, [
                orderId,
                productId,
                quantity,
            ]);
            conn.release();
            const returnedData: OrderProduct = {
                id: result.rows[0].id,
                orderId,
                productId,
                quantity,
            };
            return returnedData;
        } catch (err) {
            throw new Error(`Could not add new order. Error: ${err}`);
        }
    }
    async getById(id: string): Promise<Order> {
        try {
            const conn = await DBConnection.connect();
            const sql = 'select * from orders where id=$1 ';
            const values = [id];
            const result = await conn.query(sql, values);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannont get the order ${err}`);
        }
    }
    async getCurrent(id: string): Promise<unknown> {
        try {
            const conn = await DBConnection.connect();
            const sql =
                'select * from orders inner join order_products on orders.id=order_products.order_id where orders.user_id=$1 AND orders.active=true ';
            const values = [id];
            const result = await conn.query(sql, values);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannont get the order ${err}`);
        }
    }
    async getCompleted(id: string): Promise<unknown> {
        try {
            const conn = await DBConnection.connect();
            const sql =
                'select * from orders inner join order_products on orders.id=order_products.order_id where orders.user_id=$1 AND orders.active=false';
            const values = [id];
            const result = await conn.query(sql, values);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannont get the order ${err}`);
        }
    }

    async updateStatus(id: string, status: boolean): Promise<Order> {
        try {
            const conn = await DBConnection.connect();
            const sql = 'update orders set status=$1 where id=$2 returning *';
            const values = [status, id];
            const result = await conn.query(sql, values);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannont get the order ${err}`);
        }
    }
    async deleteById(id: string): Promise<Order> {
        try {
            const conn = await DBConnection.connect();
            const sql = 'delete from orders where id = $1 ';
            const values = [id];
            const result = await conn.query(sql, values);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannont dele the User ${err}`);
        }
    }
}
export default new OrderModel();
