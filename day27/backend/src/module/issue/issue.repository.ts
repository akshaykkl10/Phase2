import type {  Prisma, IssuePriority, IssueStatus } from '../../generated/client.js';
import { prisma } from '../../db/prisma.js'
import {debug} from './issue.router.js'

type IssueFilters = {
  status?: IssueStatus;
  priority?: IssuePriority;
};

type PaginationInput = {
  page: number;
  limit: number;
};

const issueInclude = {
    created_by: {
        select: {
            name: true,
            email: true,
            role: true,
        }
    },
    assigned_to: {
        select: {
            name: true,
            email: true,
            role: true,
        }
    },
    project: {
        select: {
            name: true
        }
    }
    
} satisfies Prisma.IssueInclude

export class IssueRepository {
    async createIssue (issue: Prisma.IssueUncheckedCreateInput) {
        debug('Creating Issue')
        return prisma.issue.create({
            data: issue,
            include: issueInclude
        })
    }

    async findById(id: string) {
        debug('Finding Issue')
        return prisma.issue.findUnique({
        where: { id },
        include: issueInclude
        });
    }
    async findMany (filters: IssueFilters, pagination: PaginationInput) {
        
        debug('Finding Issues')
        const [item, total] = await Promise.all([
            prisma.issue.findMany({
                where: filters,
                include: issueInclude,
                orderBy: {
                    createdat: 'asc'
                },
                skip: (pagination.page - 1) * pagination.limit,
                take: pagination.limit
            }),
            prisma.issue.count({where: filters})
        ])
        return {item, total}
    }
    async update (id: string, data: Prisma.IssueUncheckedUpdateInput) {
        debug('Updating Issue')
        return prisma.issue.update({
            where: {id},
            data,
            include: issueInclude
        })
    }
    async delete (id: string) {
        debug('Deleting Issue')
        return prisma.issue.delete({
            where: {id},
            include: issueInclude
        })
    }
}