import { Post } from '../interfaces/post.interface';
import { pool } from '../db';
import { User, UserWithCredentials } from '../interfaces/user.interface';

export class UserRepository {
    static async createUser(payload: UserWithCredentials): Promise<User> {
        const query = {
            text: 'INSERT INTO users(firstName, lastName, email, password) VALUES($1, $2, $3, $4) RETURNING id, firstName, lastName, email, createdAt, updatedAt',
            values: [payload.firstName, payload.lastName, payload.email, payload.password],
        }
        const user = await pool.query(query)
        return user.rows[0];
    };

    static async getUsers(): Promise<User[]> {
        const query = {
          text: 'SELECT users.id, users.firstName, users.lastName, users.email FROM users'
        }
        const users = await pool.query(query);
        return users.rows;
    };

    static async getUser(payload: string|Number): Promise<User> {
        let userId: Number, email: string;
        if (typeof payload === 'string') {
            email = payload;
            userId = null
        } else {
            userId = payload;
            email = null;
        }
        const query = {
            text: 'SELECT * FROM users WHERE email = $1 OR id = $2',
            values: [email, userId]
        }
        const user = await pool.query(query);
        return user.rows[0];
    }

    static async createPost(userId: Number, payload: Post): Promise<Post> {
        const query = {
            text: 'INSERT INTO posts(title, content, userId) VALUES($1, $2, $3) RETURNING *',
            values: [payload.title, payload.content, userId],
        }
        const user = await pool.query(query)
        return user.rows[0];
    }

    static async getUserPosts(userId: Number): Promise<Post[]> {
        const query = {
          text: 'SELECT posts.id, posts.title, posts.content, posts.userId FROM posts WHERE userId = $1',
          values: [userId]
        }
        const users = await pool.query(query);
        return users.rows;
    };

    static async getTopUsers(): Promise<User[]> {
        const query = {
          text: `
            WITH RankedComments As (
                SELECT
                    u.id AS userId,
                    u.firstName AS firstName,
                    u.lastName AS lastName,
                    COUNT(p.id) OVER (PARTITION BY u.id) AS postCount,
                    c.content AS latestComment,
                    ROW_NUMBER() OVER (PARTITION BY u.id ORDER BY c.createdAt DESC) AS rn
                FROM Users u
                LEFT JOIN Posts p ON u.id = p.userId
                LEFT JOIN Comments c ON u.id = c.userId
            )
            SELECT userId, firstName, lastName, postCount, latestComment
            FROM RankedComments
            WHERE rn = 1
            ORDER BY postCount DESC
            LIMIT 3
          `
        }
        const users = await pool.query(query);
        return users.rows;
    };
}
