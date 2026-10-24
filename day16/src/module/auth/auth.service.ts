import { Role, type Prisma } from "../../generated/client.js";
import { AuthRepository } from "./auth.repository.js";
import type { CreateUserInput } from "./auth.shemas.js";

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
}
