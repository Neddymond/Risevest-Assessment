import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { configService } from '../config/config.service';
import { Helpers } from '../helpers/utility.helper';

export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const secretKey = configService.getValue('TOKEN_SECRET');
        const auth = req.headers.authorization;
        if (!auth) {
            return Helpers.sendErrorResponse(res, 'Please provide a token', 'UNAUTHORIZED');
        }
        const token = auth.split(' ')[1];
        const decodedToken = jwt.verify(token, secretKey);
        req['user'] = decodedToken;
        next();
    } catch (error) {
        return Helpers.sendErrorResponse(res, 'Invalid token', 'UNAUTHORIZED');
    }
}