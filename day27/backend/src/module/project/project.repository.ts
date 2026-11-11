import type { Prisma } from '../../generated/client.js';
import { prisma } from '../../db/prisma.js'
import {debug} from './project.router.js'


type PaginationInput = {
  page: number;
  limit: number;
};

const projectInclude = {
    issues: {
        select: {
            title: true,
            description: true,
            status: true,
            priority: true
        }
    }
} satisfies Prisma.ProjectInclude

export class ProjectRepository {
    async createProject (project: Prisma.ProjectUncheckedCreateInput) {
        debug('Creating Project')
        return prisma.project.create({
            data: project,
            include: projectInclude
        })
    }

    async findById(id: string) {
        debug('Finding Project by id')
        return prisma.project.findUnique({
        where: { id },
        include: projectInclude
        });
    }
    async findByName(name: string) {
        debug('Finding Project by name')
        return prisma.project.findUnique({
        where: { name },
        include: projectInclude
        });
    }
    async findMany ( pagination: PaginationInput) {
        
        debug('Finding Projects')
        const [item, total] = await Promise.all([
            prisma.project.findMany({
                include: projectInclude,
                skip: (pagination.page - 1) * pagination.limit,
                take: pagination.limit
            }),
            prisma.project.count()
        ])
        return {item, total}
    }
    async update (id: string, data: Prisma.ProjectUncheckedUpdateInput) {
        debug('Updating Project')
        return prisma.project.update({
            where: {id},
            data,
            include: projectInclude
        })
    }
    async delete (id: string) {
        debug('Deleting Project')
        return prisma.project.delete({
            where: {id},
            include: projectInclude
        })
    }
}