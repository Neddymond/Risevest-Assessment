import { Post } from '../interfaces/post.interface';
import { pool } from '../db';
import { User } from '../interfaces/user.interface';

export class UserRepository {
    static async createUser(payload: User): Promise<User> {
        const query = {
            text: 'INSERT INTO users(firstName, lastName, email) VALUES($1, $2, $3) RETURNING *',
            values: [payload.firstName, payload.lastName, payload.email],
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

    static async getUserbyId(userId: Number): Promise<User> {
        const query = {
            text: 'SELECT users.id FROM users WHERE id = $1',
            values: [userId]
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
