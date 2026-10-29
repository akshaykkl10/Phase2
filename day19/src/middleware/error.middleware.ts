import type { NextFunction, Request, Response } from "express";
import z, { ZodError } from "zod";

export function notFoundError(
    _request: Request,
    response: Response,
    _next: NextFunction
) {
    response.status(404).json({
        error: {
            code: "NOT_FOUND",
            message: "Route not found"
        }
    });
}

export function errorHandler(
    error: unknown,
    _request: Request,
    response: Response,
    next: NextFunction
) {
    if (error instanceof ZodError) {
        const flattened = z.flattenError(error);
       response.status(422).json({
            error: {
                code: "VALIDATION_ERROR",
                message: flattened.fieldErrors
            }
        }); 
    }
    if (error instanceof Error) {
        if(error.message == 'USER_EXISTS') {
            response.status(409).json({
                 error: {
                     code: "USER_EXISTS",
                     message: "The email is already registered."
                 }
            }); 
            next()
        }
        if(error.message == 'TOKEN_EXPIRED') {
            response.status(401).json({
                 error: {
                     code: "TOKEN_EXPIRED",
                     message: "Your Session Expired. Please login again."
                 }
            }); 
            next()
        }
        if(error.message == 'TOKEN_INVALID') {
            response.status(401).json({
                 error: {
                     code: "TOKEN_INVALID",
                     message: "Your token is invalid."
                 }
            }); 
            next()
        }
        if(error.message == 'FORBIDDEN') {
            response.status(403).json({
                 error: {
                     code: "FORBIDDEN",
                     message: "You lack permissions for this action."
                 }
            }); 
            next()
        }
        response.status(500).json({
            error: {
                code: "UNKNOWN ERROR",
                message: error.message
            }
        }); 

    }
}