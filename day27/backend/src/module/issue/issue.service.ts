import { Prisma, type Issue } from "../../generated/client.js";
import { Role, IssuePriority, IssueStatus } from "../../generated/enums.js";
import type { AuthUser } from "../../types.js";
import { IssueRepository } from "./issue.repository.js";
import type { CreateIssueInput, ListIssuesInput, UpdateIssuesInput } from "./issue.schema.js";
import {debug} from './issue.router.js'

const repository = new IssueRepository()

function canViewIssue(user: AuthUser, issue: Issue) {
    switch (user.role) {
        case "ADMIN":
            return true;

        case "AGENT":
            return user.id == issue.assigned_to_id || user.id == issue.created_by_id            

        case "USER":
            return user.id == issue.created_by_id            
                
        default:
            return false;
    }
}

export class IssueService {
    async createIssue(authUser: AuthUser, input: CreateIssueInput) {
        debug('Sending data to issue repository')
        return repository.createIssue({
            title: input.title,
            description: input.description,
            project_id: input.project,
            priority: input.priority,
            created_by_id: authUser.id
        })
    }
    async showIssueById (authUser: AuthUser, issueId: string) {
        debug('Sending data to issue repository')
        const issue = await repository.findById(issueId);
        if(!canViewIssue(authUser, issue!)) {
            debug('Issue forbidden')

            throw new Error('FORBIDDEN')
        }
        if (!issue) {
            debug('Issue notFound')
            throw new Error('TICKET_NOT_FOUND');
        }
        return issue;
    }

    async listIssues(authUser: AuthUser, query: ListIssuesInput) {
        const filters: Partial<{
            status: IssueStatus;
            priority: IssuePriority;
            created_by_id: string;
            assigned_to_id: string;
            project_id: string
        }> = {};

        if (query.status) {
            filters.status = query.status;
        }
        
        if (query.priority) {
            filters.priority = query.priority;
        }

        if (query.project) {

            filters.project = query.project;
        }

        if(authUser.role == Role.USER) {
            filters.created_by_id = authUser.id
            if(query.assigned_to_id) {
                filters.assigned_to_id = query.assigned_to_id
            }
        }
        else if(authUser.role == Role.AGENT) {
            filters.assigned_to_id = authUser.id
        }
        else {
            if(query.created_by_id) {
                filters.created_by_id = query.created_by_id
            }
            if(query.assigned_to_id) {
                filters.assigned_to_id = query.assigned_to_id
            }
        }        

        const page = query.page && Number(query.page) > 0 ? Number(query.page) : 1;
        const limit = query.limit && Number(query.limit) > 0 ? Number(query.limit) : 10;
        debug('Sending data to issue repository')
        const { item, total } = await repository.findMany(filters, {
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
    async updateIssue(authUser: AuthUser, issueId: string, input: UpdateIssuesInput) {
        const updateData: Prisma.IssueUncheckedUpdateInput= {}
        if (input.title !== undefined) updateData.title = input.title;

        if (input.description !== undefined) updateData.description = input.description;

        if (input.priority !== undefined) updateData.priority = input.priority;
        if (input.project !== undefined){
            
            updateData.project_id = input.project;

        }
        await this.showIssueById(authUser, issueId)
        debug('Sending data to issue repository')
        return repository.update(issueId,updateData)
    }
    async deleteIssue (authUser: AuthUser, issueId: string) {
        await this.showIssueById(authUser, issueId)
        debug('Sending data to issue repository')
        return repository.delete(issueId)
    }
}