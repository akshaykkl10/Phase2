import { Role, type Prisma } from "../../generated/client.js";
import { AuthRepository } from "./auth.repository.js";
import { type CreateUserInput, type ListUserInput} from "./auth.shemas.js";

type UserFilters = {
    role?: Role
}

type PaginationInput = {
  page: number;
  limit: number;
};

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
}
