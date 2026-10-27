import type { Request, Response } from "express";
import { AuthService } from "./auth.service.js";

const service = new AuthService()

export class AuthController {
    async login(request: Request, response: Response) {
        const data = await service.loginUser(request.body)
        response.status(200).json({data})
    }
    async me(request: Request, response: Response) {
        const data = await service.me(request.headers.authorization as string)
        response.status(200).json({data})
    }
}