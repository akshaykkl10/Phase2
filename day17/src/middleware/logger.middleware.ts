import type { NextFunction, Request, Response } from "express";

export function logger (request: Request, _response: Response, next: NextFunction) {
    console.log(`${request.path}  ${request.method}`)
    next()
}