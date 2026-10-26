import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

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
       response.status(404).json({
            error: {
                code: "VALIDATION_ERROR",
                message: "Route not found"
            }
        }); 
    }
    if (error instanceof Error) {
        if(error.message == 'USER_EXISTS') {
            response.status(404).json({
                 error: {
                     code: "USER_EXISTS",
                     message: "The email is already registered."
                 }
            }); 
            next()
        }
        if(error.message == 'TOKEN_EXPIRED') {
            response.status(404).json({
                 error: {
                     code: "TOKEN_EXPIRED",
                     message: "Your Session Expired. Please login again."
                 }
            }); 
            next()
        }
        response.status(404).json({
            error: {
                code: "UNKNOWN ERROR",
                message: error.message
            }
        }); 

    }
}