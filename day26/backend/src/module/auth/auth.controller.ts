import type { Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import {debug} from './auth.router.js'

const service = new AuthService()

export class AuthController {
    async login(request: Request, response: Response) {
        debug('Sending data to auth service')
        const data = await service.loginUser(request.body)
        response.status(200).json({...data})
        debug('response created')
    }
    async me(request: Request, response: Response) {
        debug('Sending data to auth service')
        const data = await service.me(request.headers.authorization as string)
        response.status(200).json({data})
        debug('response created')
    }
}