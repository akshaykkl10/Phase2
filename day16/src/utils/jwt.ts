import { jwtVerify, SignJWT } from "jose";
import { env } from "../config/env.js";

const SECRET_KEY = new TextEncoder().encode(env.JWT_SECRET)
const TIME_OUT = env.JWT_EXPIRES_IN

export async function generateToken(id: string, email: string, role: string ) {
    return await new SignJWT({id,email, role})
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime(TIME_OUT)
    .sign(SECRET_KEY)
}

export async function authTocken(token: string) {
    try {
        const {payload} = await jwtVerify(token, SECRET_KEY)
        return payload
    } catch (error: unknown) {
        if (error instanceof Error)
        throw new Error(error.message)
    }
}