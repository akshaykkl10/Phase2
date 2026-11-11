import type { Request, Response} from 'express';
import type { CreateIssueInput, ListIssuesInput, UpdateIssuesInput } from "./issue.schema.js";
import { IssueService } from "./issue.service.js";
import {debug} from './issue.router.js'

const service = new IssueService()

export class IssueController {
    async createIssue(request: Request, response: Response) {
        debug('Sending data to issue service')
        const issue = await service.createIssue(request.user, request.body as CreateIssueInput)
        response.status(201).json({data: issue})
        debug('response created')
    }
    async showIssueById(request: Request, response: Response) {
        debug('Sending data to issue service')
        const issue = await service.showIssueById(request.user, request.params.id as string)
        response.status(200).json({data: issue})
        debug('response created')
    }
    async listIssues(request: Request, response: Response) {
        debug('Sending data to issue service')
        const issues = await service.listIssues(request.user, request.query as unknown as ListIssuesInput)
        response.status(200).json(issues)
        debug('response created')
    }
    async updateIssue(request: Request, response: Response) {
        debug('Sending data to issue service')
        const issue = await service.updateIssue(
            request.user, 
            request.params.id as string,
            request.body as UpdateIssuesInput
        )
        response.status(200).json({data: issue})
        debug('response created')
    }
    async deleteIssue(request: Request, response: Response) {
        debug('Sending data to issue service')
        await service.deleteIssue(request.user, request.params.id as string)
        response.status(204).end()
        debug('response created')
    }
}