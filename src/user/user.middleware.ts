import { Request, Response, NextFunction } from 'express';
import { Helpers } from '../helpers/utility.helper';
import { UserRepository } from './user.repository';


export const validateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.id);
        const email = req.body.email;
        const payload = userId || email;
        const user = await UserRepository.getUser(payload);
        req['user'] = user;
        if (!user) {
            return Helpers.sendErrorResponse(res, 'User provided does not exist', 'BAD_REQUEST');
        }
        return next();
    } catch (error) {
        console.error('server error ---> ', error.message);
        return Helpers.sendErrorResponse(res, 'Something went wrong', 'INTERNAL_SERVER_ERROR');
    }
}
