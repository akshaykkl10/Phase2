import { Prisma, type Project } from "../../generated/client.js";
import { Role } from "../../generated/enums.js";
import type { AuthUser } from "../../types.js";
import { ProjectRepository } from "./project.repository.js";
import type { CreateProjectInput, UpdateProjectsInput } from "./project.schema.js";
import {debug} from './project.router.js'
import type { PaginationInput } from "../auth/auth.shemas.js";

const repository = new ProjectRepository()

export class ProjectService {
    async createProject(authUser: AuthUser, input: CreateProjectInput) {
        debug('Sending data to project repository')
        return repository.createProject({
            name: input.name,
        })
    }
    async showProjectById (authUser: AuthUser, projectId: string, canAccess: boolean = true) {
        debug('Sending data to project repository')
        const project = await repository.findById(projectId);
        if(!canAccess) {
            debug('Project Access Denied')
            throw new Error('FORBIDDEN');
        }
        if (!project) {
            debug('Project notFound')
            throw new Error('PROJECT_NOT_FOUND');
        }
        return project;
    }

    async listProjects(query: PaginationInput) {
        const page = query.page && Number(query.page) > 0 ? Number(query.page) : 1;
        const limit = query.limit && Number(query.limit) > 0 ? Number(query.limit) : 10;
        debug('Sending data to project repository')
        const { item, total } = await repository.findMany({
            page,
            limit
        });
        return {
            data: item,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        }
    }
    async updateProject(authUser: AuthUser, projectId: string, input: UpdateProjectsInput) {
        const updateData: Prisma.ProjectUncheckedUpdateInput= {}
        if (input.name !== undefined){
            
            updateData.name = input.name;

        }
        await this.showProjectById(authUser, projectId, (authUser.role == Role.ADMIN))
        debug('Sending data to project repository')
        return repository.update(projectId,updateData)
    }
    async deleteProject (authUser: AuthUser, projectId: string) {
        await this.showProjectById(authUser, projectId, (authUser.role == Role.ADMIN))
        debug('Sending data to project repository')
        return repository.delete(projectId)
    }
}