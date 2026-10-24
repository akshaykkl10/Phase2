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
        const data = await service.getUsers(request.body, request.query)
        response.status(202).json({data})
    }
}