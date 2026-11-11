import type { NextFunction, Request, Response } from "express";
import createDebug from 'debug';

const debug = createDebug('app:tickets')
export function logger (request: Request, response: Response, next: NextFunction) {
    console.log(`${request.path}  ${request.method}`)
    debug(`METHOD: ${request.method} URL: ${request.path} REQUESTID: ${response.locals.requestId}`)
    next()
}