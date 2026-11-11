import { Router } from "express"
import { IssueController } from "./issue.controller.js";
import { authUser } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validation.middleware.js";
import { createIssueSchema, listIssuesQuerySchema, issueIdParamSchema, updateIssueSchema } from "./issue.schema.js";
import createDebug from 'debug';

export const issueRoutes = Router();

const controller = new IssueController()

export const debug = createDebug('route:issues')

issueRoutes.use(authUser)
issueRoutes.post('/',validate({body: createIssueSchema}), controller.createIssue)
issueRoutes.get('/', validate({query: listIssuesQuerySchema}), controller.listIssues)
issueRoutes.get('/:id', validate({params: issueIdParamSchema}), controller.showIssueById)
issueRoutes.patch('/:id', validate({params: issueIdParamSchema, body: updateIssueSchema}), controller.updateIssue)
issueRoutes.delete('/:id', validate({params: issueIdParamSchema}), controller.deleteIssue)

