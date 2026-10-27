import { Role } from "../../generated/enums.js";
import { UserRepository } from "./user.repository.js";
import { type CreateUserInput, type ListUserInput} from "../auth/auth.shemas.js";
import { hashPassword, verifyPassword } from "../../utils/password.js";


type UserFilters = {
    role?: Role
}

type PaginationInput = {
  page: number;
  limit: number;
};

async function userExists(email: string): Promise<boolean>  {
    const result = await repository.getUser(email)
    if(result) {
        return true
    }
    return false
}

const repository = new UserRepository()

export class UserService {
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
    async getUser(email: string) {
        return repository.getUser(email)
    }
    async deleteUser(email: string) {
        return repository.deleteUser(email)
    }
}