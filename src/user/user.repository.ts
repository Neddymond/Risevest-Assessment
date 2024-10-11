import { Post } from '../interfaces/post.interface';
import { pool } from '../db';
import { User } from '../interfaces/user.interface';

export class UserRepository {
    public static async createUser(payload: User): Promise<User> {
        const query = {
            text: 'INSERT INTO users(firstName, lastName, email) VALUES($1, $2, $3) RETURNING *',
            values: [payload.firstName, payload.lastName, payload.email],
        }
        const user = await pool.query(query)
        return user.rows[0];
    };

    public static async getUsers(): Promise<User[]> {
        const query = {
          text: 'SELECT users.id, users.firstName, users.lastName, users.email FROM users'
        }
        const users = await pool.query(query);
        return users.rows;
    };

    public static async getUserbyId(userId: Number): Promise<User> {
        const query = {
            text: 'SELECT users.id FROM users WHERE id = $1',
            values: [userId]
        }
        const user = await pool.query(query);
        return user.rows[0];
    }

    public static async createPost(userId: Number, payload: Post): Promise<Post> {
        const query = {
            text: 'INSERT INTO posts(title, content, userId) VALUES($1, $2, $3) RETURNING *',
            values: [payload.title, payload.content, userId],
        }
        const user = await pool.query(query)
        return user.rows[0];
    }

    public static async getUserPosts(userId: Number): Promise<Post[]> {
        const query = {
          text: 'SELECT posts.id, posts.title, posts.content, posts.userId FROM posts WHERE userId = $1',
          values: [userId]
        }
        const users = await pool.query(query);
        return users.rows;
    };
}
