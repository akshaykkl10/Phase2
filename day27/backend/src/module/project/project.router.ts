import { Router } from "express"
import { ProjectController } from "./project.controller.js";
import { authUser } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validation.middleware.js";
import { createProjectSchema, paginationQuerySchema, projectIdParamSchema, updateProjectSchema } from "./project.schema.js";
import createDebug from 'debug';

export const projectRoutes = Router();

const controller = new ProjectController()

export const debug = createDebug('route:projects')

projectRoutes.use(authUser)
projectRoutes.post('/',validate({body: createProjectSchema}), controller.createProject)
projectRoutes.get('/', validate({query: paginationQuerySchema}),controller.listProjects)
projectRoutes.get('/:id', validate({params: projectIdParamSchema}), controller.showProjectById)
projectRoutes.patch('/:id', validate({params: projectIdParamSchema, body: updateProjectSchema}), controller.updateProject)
projectRoutes.delete('/:id', validate({params: projectIdParamSchema}), controller.deleteProject)

