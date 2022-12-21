import supertest from 'supertest';
import app from '../../server';
const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFobWVkQGdtYWlsLmNvbSIsImlhdCI6MTY2ODI2NzI0Mn0.6PoGMNpfDkLsOQUF5uVhkjzceOHRQguZ_H1XeoZnKFo';

const request = supertest(app);
describe('Prdoucts APIs: ', () => {
    it('GET /products should return all the products', () => {
        request
            .get('/api/v1/products')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', 'application/json');
    });

    it('GET /products/:id should return a product', () => {
        request
            .get('/api/v1/products/1')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', 'application/json')
            .expect(200);
    });

    it('DELETE /products should delete a product by id', () => {
        const prodcut = {
            name: 'Fan Heater',
            price: 999,
            category: 'Heaters',
            userId: 1,
        };
        request
            .get('/api/v1/products/1')
            .set('Authorization', `Bearer ${token}`)
            .send(prodcut)
            .expect('Content-Type', 'application/json')
            .expect(200);
    });
});
