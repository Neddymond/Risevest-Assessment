import { Request, Response } from 'express';
import { PostRepository } from './post.repository';
import { Helpers } from '../helpers/utility.helper';

export class Post {
    static async createComment (req: Request, res: Response) {
        try {
            const postId = Number(req.params.postId);
            const userId = Number(req['user'].id);
            const post = await PostRepository.createComment(postId, req.body, userId);
            return Helpers.sendJsonResponse(res, post, 'Comment created successfully', 'CREATED');
        } catch (err) {
            return Helpers.sendErrorResponse(res, err.message, 'BAD_REQUEST');
        }
    }
}