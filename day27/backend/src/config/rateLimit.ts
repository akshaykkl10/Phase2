import rateLimit from "express-rate-limit";

export const apiLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: true,

    message: {
        error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Too many requests, try again later.'
        }
    }
});


export const loginLimt = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: true,

    message: {
        error: {
            code: 'LOGIN_RATE_LIMIT_EXCEEDED',
            message: 'Too many login attempts, try again later.'
        }
    }
});