import { Response } from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { configService } from '../config/config.service';
import { User } from '../interfaces/user.interface';

export class Helpers {
    static sendJsonResponse(res: Response, content: any, message: string, status: string) {
        const data = {
            success: true,
            message,
            data: content
        };
        res.status(httpStatus[status]).send(data);
    }

    static sendErrorResponse(res: Response, message: string, status: string) {
        const data = {
            status: false,
            message
        }
        res.status(httpStatus[status]).send(data);
    }

    static createAuthToken({ id, email }: User) {
        const secretKey = configService.getValue('TOKEN_SECRET');
        return jwt.sign({ id, email }, secretKey);
    }
}
