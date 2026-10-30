import type { NextFunction, Request, Response } from "express";
import { randomUUID } from "node:crypto";

export function requestId(_req: Request, res: Response, next: NextFunction) {
    const requestId = randomUUID();
    res.setHeader('X-Request-ID', requestId);
    res.locals.requestId = requestId;
    next();
}