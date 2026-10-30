import type { Request, Response } from "express";
import { UserService } from "./user.service.js";
import type { CreateUserInput, ListUserInput } from "./user.schemas.js";
import {debug} from './user.router.js'

const service = new UserService()

export class UserController {
    async register(request: Request, response: Response) {
        debug('Sending data to user service')
        const data = await service.register(request.body as CreateUserInput)
        response.status(201).json({data})
        debug('response created')
    }
    async getUsers(request: Request, response: Response) {
        debug('Sending data to user service')
        const data = await service.getUsers(request.query as ListUserInput)
        response.status(200).json({data})
        debug('response created')
    }
    async getUser(request: Request, response: Response) {
        debug('Sending data to user service')
        const data = await service.getUser(request.params.id as string)
        response.status(200).json({data})
        debug('response created')
    }
    async deleteUser(request: Request, response: Response) {
        debug('Sending data to user service')
        await service.deleteUser(request.params.id as string)
        response.status(204).end()
        debug('response created')
    }
}