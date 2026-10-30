import type { NextFunction, Request, Response } from "express";
import { authTocken } from "../utils/jwt.js";
import { Role } from "../generated/enums.js";

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

export async function authUser(request: Request, _response: Response, next: NextFunction) {
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
            next(err); 
        }
    }
}

export function requireRole(request: Request, _response: Response, next: NextFunction) {
    if(request.user.role == Role.ADMIN) {
        return next();
    }
    throw new Error('FORBIDDEN')
}