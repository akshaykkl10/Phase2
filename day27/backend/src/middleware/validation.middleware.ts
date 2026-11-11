import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

type RequestSchema = {
    body?: ZodType;
    params?: ZodType;
    query?: ZodType;
}

function assignProperty<T>(request: Request, property: 'body' | 'params' | 'query', value: T) {
    Object.defineProperty(request, property, {
        value,
        writable: true,
        configurable: true,
        enumerable: true
    })
}

export function validate(schema: RequestSchema) {
    return (request: Request, _response: Response, next: NextFunction) => {
        try {
            if(schema.body) {
                assignProperty(request, 'body', schema.body.parse(request.body))
            }
            if(schema.params) {
                assignProperty(request, 'params', schema.params.parse(request.params))
            }
            if(schema.query) {
                assignProperty(request, 'query', schema.query.parse(request.query))
            }
            next();
        } catch (error) {
            next(error);
        }
    }

}