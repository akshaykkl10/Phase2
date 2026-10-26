import { Role, type Prisma } from "../../generated/client.js";
import { AuthRepository } from "./auth.repository.js";
import { type CreateUserInput, type ListUserInput} from "./auth.shemas.js";
import { hashPassword, verifyPassword } from "../../utils/password.js";
import { authTocken, generateToken } from "../../utils/jwt.js";

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

async function userExists(email: string): Promise<boolean>  {
    const result = await repository.getUser(email)
    if(result) {
        return true
    }
    return false
}

export class AuthService {
    async register(body: CreateUserInput) {
        if(!body.role)body.role = Role.USER;
        if(await userExists(body.email)){
            throw new Error("USER_EXISTS")
        }
        body.password = await hashPassword(body.password)
        return repository.register(body)
    }
    async getUsers(query: Record<string, any>) {

        const filters: UserFilters = {}
        const pagination: PaginationInput = {
            page: query.page? query.page = Number(query.page) : query.page = 1,
            limit: query.limit? query.limit = Number(query.limit) : query.limit = 10
        }
        if(query.role) filters.role = query.role
        
        
        const {users, total} =  await repository.getUsers(filters, pagination)
        return {
            data: users,
            pagination: {
                page: pagination.page,
                limit: pagination.limit,
                total,
                totalPages: Math.ceil(total / pagination.limit)
            }
        }
    }
    async loginUser(input: LoginInput) {
        if(!input.email || !input.password) {
            throw new Error("INVALID_CREDENTIALS")
        }
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
                name: user.name, 
                email: user.email,
                role: user.role
            },
            token
        }
    }
    async me(token: string) {
        if(!token) throw new Error("INVALID_CREDENTIAL");
        const payload = await authTocken(token.replace('Bearer ', '')) as TokenPayload
        return {
            id: payload.id,
            email: payload.email,
            role: payload.role
        }
    }
}
