import type { Request, Response} from 'express';
import type { CreateProjectInput, UpdateProjectsInput } from "./project.schema.js";
import { ProjectService } from "./project.service.js";
import {debug} from './project.router.js'
import type { PaginationInput } from '../auth/auth.shemas.js';

const service = new ProjectService()

export class ProjectController {
    async createProject(request: Request, response: Response) {
        debug('Sending data to project service')
        const project = await service.createProject(request.user, request.body as CreateProjectInput)
        response.status(201).json({data: project})
        debug('response created')
    }
    async showProjectById(request: Request, response: Response) {
        debug('Sending data to project service')
        const project = await service.showProjectById(request.user, request.params.id as string)
        response.status(200).json({data: project})
        debug('response created')
    }
    async listProjects(request: Request, response: Response) {
        debug('Sending data to project service')
        const projects = await service.listProjects(request.query as unknown as PaginationInput)
        response.status(200).json(projects)
        debug('response created')
    }
    async updateProject(request: Request, response: Response) {
        debug('Sending data to project service')
        const project = await service.updateProject(
            request.user, 
            request.params.id as string,
            request.body as UpdateProjectsInput
        )
        response.status(200).json({data: project})
        debug('response created')
    }
    async deleteProject(request: Request, response: Response) {
        debug('Sending data to project service')
        await service.deleteProject(request.user, request.params.id as string)
        response.status(204).end()
        debug('response created')
    }
}