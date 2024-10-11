import { Request, Response } from 'express';
import { UserRepository } from './user.repository';
import { Helpers } from '../helpers/utility.helper';

export class User {
    public static async createUser (req: Request, res: Response) {
        try {
            const user = await UserRepository.createUser(req.body);
            return Helpers.sendJsonResponse(res, user, 'User created successfully', 'CREATED');
        } catch (err) {
            return Helpers.sendErrorResponse(res, err.message, 'BAD_REQUEST');
        }
    }

    public static async getUsers(req: Request, res: Response) {
        try {
            const user = await UserRepository.getUsers();
            return Helpers.sendJsonResponse(res, user, 'Users fetched successfully', 'OK');
        } catch (err) {
            return Helpers.sendErrorResponse(res, err.message, 'BAD_REQUEST');
        }
    }

    public static async createPost (req: Request, res: Response) {
        try {
            const userId = Number(req.params.id);
            const user = await UserRepository.createPost(userId, req.body);
            return Helpers.sendJsonResponse(res, user, 'Post created successfully', 'CREATED');
        } catch (err) {
            return Helpers.sendErrorResponse(res, err.message, 'BAD_REQUEST');
        }
    }

    public static async getPosts(req: Request, res: Response) {
        try {
            const userId = Number(req.params.id);
            const user = await UserRepository.getUserPosts(userId);
            return Helpers.sendJsonResponse(res, user, 'Posts fetched successfully', 'OK');
        } catch (err) {
            return Helpers.sendErrorResponse(res, err.message, 'BAD_REQUEST');
        }
    }
}

