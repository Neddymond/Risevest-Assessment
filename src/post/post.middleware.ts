import { Request, Response, NextFunction } from 'express';
import { Helpers } from '../helpers/utility.helper';
import { PostRepository } from './post.repository';


export const validatePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postId = Number(req.params.postId);
        const post = await PostRepository.getPostbyId(postId);
        if (!post) {
            return Helpers.sendErrorResponse(res, 'Post provided does not exist', 'BAD_REQUEST');
        }
        return next();
    } catch (error) {
        return Helpers.sendErrorResponse(res, error.message, 'SERVER_ERROR');
    }
}
