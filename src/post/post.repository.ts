import { Post } from '../interfaces/post.interface';
import { pool } from '../db';

export class PostRepository {
    static async getPostbyId(postId: Number): Promise<Post> {
        const query = {
            text: 'SELECT posts.id FROM posts WHERE id = $1',
            values: [postId]
        }
        const post = await pool.query(query);
        return post.rows[0];
    }

    static async createComment(postId: Number, payload: Post, userId: Number): Promise<Post> {
        const query = {
            text: 'INSERT INTO comments(content, postId, userId) VALUES($1, $2, $3) RETURNING *',
            values: [payload.content, postId, userId],
        }
        const user = await pool.query(query)
        return user.rows[0];
    }
}
