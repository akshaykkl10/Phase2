import type { NextFunction, Request, Response } from "express";
import { authTocken } from "../utils/jwt.js";

type TokenPayload = {
    id: string
    email: string
    role: string
    int: number
    exp: number
}


declare global {
    namespace Express {
        interface Request {
            user?: any
        }
    }
}

export async function authUser(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization
    
    if(!authHeader?.startsWith('Bearer ')) {
        const error: any = new Error('UNAUTHORIZED_NO_TOKEN');
        error.status = 401;
        return next(error);
    }
    const token = authHeader?.split(' ')[1]
    if (!token) {
        const error: any = new Error('UNAUTHORIZED_INVALID_TOKEN');
        error.status = 401;
        return next(error);
    }
    try {
        const payload = await authTocken(token) as TokenPayload
        request.user = {
            id: payload.id,
            email: payload.email,
            role: payload.role
        };
        next();
    }
    catch(error: unknown) {
        if(error instanceof Error) {
            const message = error.message === 'TOKEN_EXPIRED' ? 'TOKEN_EXPIRED' : 'TOKEN_INVALID';
            const err: any = new Error(message);
            err.status = 401;
            return next(err); 
        }
    }
}