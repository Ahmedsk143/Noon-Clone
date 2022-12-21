import DBConnection from '../database';
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();
const pepper = process.env.BCRYPT_PASSWORD;
const salt = parseInt(process.env.SALT_ROUNDS as string);

export type User = {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};
class UserModel {
    async getAll(): Promise<User[]> {
        try {
            const conn = await DBConnection.connect();
            const sql = 'select * from users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannont get Users ${err}`);
        }
    }
    async addNew(user: User): Promise<User> {
        try {
            const conn = await DBConnection.connect();
            const sql =
                'insert into users(first_name, last_name,email, password) values($1, $2, $3, $4) RETURNING *';
            const hash = bcrypt.hashSync(user.password + pepper, salt);
            const values = [user.firstName, user.lastName, user.email, hash];
            const result = await conn.query(sql, values);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannont add the User ${err}`);
        }
    }
    async getById(id: string): Promise<User> {
        try {
            const conn = await DBConnection.connect();
            const sql = 'select * from users where id = $1 ';
            const values = [id];
            const result = await conn.query(sql, values);
            conn.release();
            delete result.rows[0].password;
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannont get the User ${err}`);
        }
    }
    async deleteById(id: string): Promise<User> {
        try {
            const conn = await DBConnection.connect();
            const sql = 'delete from users where id = $1 ';
            const values = [id];
            const result = await conn.query(sql, values);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannont delete the User ${err}`);
        }
    }
    async authenticate(email: string, password: string): Promise<User | null> {
        const conn = await DBConnection.connect();
        const sql = 'select * from users where email=$1';
        const result = await conn.query(sql, [email]);
        if (result.rows.length > 0) {
            if (
                bcrypt.compareSync(password + pepper, result.rows[0].password)
            ) {
                return {
                    id: result.rows[0].id,
                    firstName: result.rows[0].first_name,
                    lastName: result.rows[0].last_name,
                    email: email,
                    password: '',
                };
            }
        }
        return null;
    }
}
export default new UserModel();
