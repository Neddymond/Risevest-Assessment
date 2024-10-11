import { Request, Response, NextFunction } from 'express';
import { Helpers } from '../helpers/utility.helper';
import { UserRepository } from './user.repository';


export const validateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.id);
        const user = await UserRepository.getUserbyId(userId);
        if (!user) {
            return Helpers.sendErrorResponse(res, 'User provided does not exist', 'BAD_REQUEST');
        }
        return next();
    } catch (error) {
        return Helpers.sendErrorResponse(res, error.message, 'SERVER_ERROR');
    }
}
