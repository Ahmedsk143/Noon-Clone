import supertest from 'supertest';
import app from '../../server';
const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFobWVkQGdtYWlsLmNvbSIsImlhdCI6MTY2ODI2NzI0Mn0.6PoGMNpfDkLsOQUF5uVhkjzceOHRQguZ_H1XeoZnKFo';

const request = supertest(app);
describe('Orders APIs: ', () => {
    it('GET /orders should return orders by userid', () => {
        request
            .get('/api/v1/orders')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', 'application/json');
    });

    it('GET /orders/:id should return an order', () => {
        request
            .get('/api/v1/orders/1')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', 'application/json')
            .expect(200);
    });

    it('POST /order should add new order', () => {
        const order = {
            product_id: 1,
            quantity: 5,
            active: true,
        };
        request
            .get('/api/v1/products/1')
            .set('Authorization', `Bearer ${token}`)
            .send(order)
            .expect('Content-Type', 'application/json')
            .expect(200);
    });
});
