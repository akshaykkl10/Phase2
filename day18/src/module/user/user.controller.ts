import type { Request, Response } from "express";
import { UserService } from "./user.service.js";
import type { CreateUserInput } from "../auth/auth.shemas.js";

const service = new UserService()

export class UserController {
    async register(request: Request, response: Response) {
        const data = await service.register(request.body as CreateUserInput)
        response.status(201).json({data})
    }
    async getUsers(request: Request, response: Response) {
        const data = await service.getUsers(request.query)
        response.status(202).json({data})
    }
    async getUser(request: Request, response: Response) {
        const data = await service.getUser(request.params.id as string)
        response.status(202).json({data})
    }
    async deleteUser(request: Request, response: Response) {
        await service.deleteUser(request.params.id as string)
        response.status(204).end()
    }
}