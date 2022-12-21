import supertest from 'supertest';
import app from '../../server';
const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFobWVkQGdtYWlsLmNvbSIsImlhdCI6MTY2ODI2NzI0Mn0.6PoGMNpfDkLsOQUF5uVhkjzceOHRQguZ_H1XeoZnKFo';
const request = supertest(app);
describe('User APIs: ', () => {
    it('POST /users/signup should return a 201 status code ', () => {
        const user = {
            firstName: 'ahmed',
            lastName: 'khalil',
            email: 'ahmed@gmail.com',
            password: '12345',
        };
        request
            .post('/api/v1/users/signup')
            .send(user)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
                message: 'User has been created, Please signin',
            });
    });
    it('POST /users/signin should signin and get a token', () => {
        const user = {
            email: 'ahmed@gmail.com',
            password: '12345',
        };
        request
            .post('/api/v1/users/signin')
            .send(user)
            .expect('Content-Type', 'application/json')
            .expect(200);
    });

    it('GET /users should return all the users', () => {
        request
            .get('/api/v1/users')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', 'application/json')
            .expect([
                {
                    id: 1,
                    first_name: 'ahmed',
                    last_name: 'Khalil',
                    email: 'ahmed@gmail.com',
                    password:
                        '$2b$08$AY7RdijUn8/MRNNRHKyRUuG3DAaKw.TEdRTdpmb17Sk3OXggCfId6',
                },
            ]);
    });

    it('GET /users/:id should return a user', () => {
        request
            .get('/api/v1/users/1')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
                id: 1,
                first_name: 'ahmed',
                last_name: 'Khalil',
                email: 'ahmed@gmail.com',
                password:
                    '$2b$08$AY7RdijUn8/MRNNRHKyRUuG3DAaKw.TEdRTdpmb17Sk3OXggCfId6',
            });
    });

    it('DELETE/users/:id should delete a user', () => {
        request.delete('/api/v1/users/1').expect(200);
    });
});
