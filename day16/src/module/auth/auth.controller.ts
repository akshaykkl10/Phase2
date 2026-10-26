import type { Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import type { CreateUserInput, PaginationInput } from "./auth.shemas.js";

const service = new AuthService()

export class AuthController {
    async register(request: Request, response: Response) {
        const data = await service.register(request.body as CreateUserInput)
        response.status(201).json({data})
    }
    async getUsers(request: Request, response: Response) {
        const data = await service.getUsers(request.query)
        response.status(202).json({data})
    }
    async login(request: Request, response: Response) {
        const data = await service.loginUser(request.body)
        response.status(200).json({data})
    }
    async me(request: Request, response: Response) {
        const data = await service.me(request.headers.authorization as string)
        response.status(200).json({data})
    }
}