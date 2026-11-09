import { Role } from "../../generated/client.js";
import { AuthRepository } from "./auth.repository.js";
import { verifyPassword } from "../../utils/password.js";
import { authTocken, generateToken } from "../../utils/jwt.js";
import {debug} from './auth.router.js'

type UserFilters = {
    role?: Role
}

type PaginationInput = {
  page: number;
  limit: number;
};

type LoginInput = {
  email: string;
  password: string;
};

type TokenPayload = {
    id: string
    email: string
    role: string
    int: number
    exp: number
}

const repository = new AuthRepository()



export class AuthService {
       async loginUser(input: LoginInput) {
        if(!input.email || !input.password) {
            throw new Error("INVALID_CREDENTIALS")
        }
        debug('Sending data to ticket repository')
        const user = await repository.getUser(input.email) 
        if(!user) {
            throw new Error("INVALID_USER")
        }
        const verify = await verifyPassword(user.password, input.password)
        if(!verify) {
            throw new Error("WRONG_PASSWORD")
        }
        const token = await generateToken(user.id, user.email, user.role)
        return {
            data: {
                id: user.id,
                name: user.name, 
                email: user.email,
                role: user.role
            },
            token
        }
    }
    async me(token: string) {
        if(!token) throw new Error("INVALID_CREDENTIAL");
        debug('Authenticating Token')
        const payload = await authTocken(token.replace('Bearer ', '')) as TokenPayload
        debug(`Payload created ${typeof payload}`)
        return {
            id: payload.id,
            email: payload.email,
            role: payload.role
        }
    }
}
