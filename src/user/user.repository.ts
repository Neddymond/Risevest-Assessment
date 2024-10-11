import { pool } from '../db';
import { User } from '../interfaces/user.interface';

export class UserRepository {
    public static async createUser (payload: User): Promise<User> {
        const query = {
            text: 'INSERT INTO users(firstName, lastName, email) VALUES($1, $2, $3) RETURNING *',
            values: [payload.firstName, payload.lastName, payload.email],
        }
        const user = await pool.query(query)
        return user.rows[0];
    };

    public static async getUsers (): Promise<User[]> {
        const query = {
          text: 'SELECT users.id, users.firstName, users.lastName, users.email FROM users'
        }
        const users = await pool.query(query);
        return users.rows;
    };
}

// export const createUser = async (payload: User): Promise<User> => {
//     const query = {
//         text: 'INSERT INTO users(firstName, lastName, email) VALUES($1, $2, $3)',
//         values: [payload.firstName, payload.lastName, payload.email],
//     }
//     const user = await pool.query(query)
//     return user.rows[0];
// };

// export const getUsers = async (): Promise<User[]> => {
//   const query = {
//     text: 'SELECT users.id, users.firstName, users.lastName, users.email FROM users'
//   }
//   const users = await pool.query(query);
//   return users.rows[0];
// };

// export const getUserById = async (id: number): Promise<User | null> => {
//   return db.oneOrNone('SELECT * FROM users WHERE id = $1', [id]);
// };