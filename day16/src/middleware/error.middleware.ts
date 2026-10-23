import { NextFunction, Request, Response } from "express";
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
    _next: NextFunction
) {
    if (error instanceof ZodError) {
       response.status(404).json({
            error: {
                code: "VALIDATION_ERROR",
                message: "Route not found"
            }
        }); 
    }
}