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
    password?: string;
    prefLang: string;
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
                'insert into users(first_name, last_name,email, password, pref_lang) values($1, $2, $3, $4, $5) RETURNING *';
            let hash;
            if (user.password) {
                hash = bcrypt.hashSync(user.password + pepper, salt);
            } else {
                throw new Error(`Password must be provided`);
            }
            const values = [
                user.firstName,
                user.lastName,
                user.email,
                hash,
                user.prefLang,
            ];
            const result = await conn.query(sql, values);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannont add the User ${err}`);
        }
    }
    async checkEmail(user: User): Promise<boolean> {
        try {
            const conn = await DBConnection.connect();
            const sql = 'select * from users where email=$1';
            const values = [user.email];
            const result = await conn.query(sql, values);
            conn.release();
            return result.rows[0] != undefined;
        } catch (err) {
            throw new Error(`Cannont add the User ${err}`);
        }
    }
    async changePass(id: string, value: string): Promise<boolean> {
        try {
            const conn = await DBConnection.connect();
            const sql = `update users set password = $1 where id = $2 returning *`;
            const hash = bcrypt.hashSync(value + pepper, salt);
            const values = [hash, id];
            const result = await conn.query(sql, values);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Can't change the password ${err}`);
        }
    }
    async changeName(
        id: string,
        first: string,
        last: string
    ): Promise<boolean> {
        try {
            const conn = await DBConnection.connect();
            const sql = `update users set first_name = $1, last_name = $2  where id = $3 returning *`;
            const values = [first, last, id];
            await conn.query(sql, values);
            conn.release();
            return true;
        } catch (err) {
            throw new Error(`Cannont change the name ${err}`);
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
            const user: User = {
                id: result.rows[0].id,
                firstName: result.rows[0].first_name,
                lastName: result.rows[0].last_name,
                email: result.rows[0].email,
                prefLang: result.rows[0].pref_lang,
            };
            return user;
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
    async deleteAll(): Promise<boolean> {
        try {
            const conn = await DBConnection.connect();
            const sql = 'delete from users';
            await conn.query(sql);
            conn.release();
            return true;
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
                    prefLang: result.rows[0].pref_lang,
                };
            }
        }
        return null;
    }

    async checkPassword(id: string, password: string): Promise<boolean> {
        const conn = await DBConnection.connect();
        const sql = 'select * from users where id=$1';
        const result = await conn.query(sql, [id]);
        if (result.rows.length > 0) {
            if (
                bcrypt.compareSync(password + pepper, result.rows[0].password)
            ) {
                return true;
            }
        }
        return false;
    }
}
export default new UserModel();
