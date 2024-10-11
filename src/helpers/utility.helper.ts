import { Response } from 'express';
import httpStatus from 'http-status';

export class Helpers {
    static sendJsonResponse(res: Response, content: any, message: string, status: string) {
        const data = {
            success: true,
            message,
            data: content
        };
        res.status(httpStatus[status]).send({data});
    }

    static sendErrorResponse(res: Response, message: string, status: string) {
        const data = {
            status: false,
            message
        }
        res.status(httpStatus[status].send(data));
        // throw new HttpException(message, httpStatus[status])
    }
}

// export class HttpException extends Error {
//     public status: number;
//     public message: string;
//     constructor(message: string, status: number) {
//       super(message)
//       this.status = status
//       this.message = message
//     }
//   }