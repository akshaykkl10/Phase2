import { Router } from "express"
import { UserController } from "./user.controller.js";
import { authUser, requireRole } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validation.middleware.js";
import { createUserSchema, listUserSchema, userIdParamSchema } from "./user.schemas.js";

export const userRoutes = Router();

const controller = new UserController()

userRoutes.use(authUser)
userRoutes.use(requireRole)
userRoutes.post('/register', validate({body: createUserSchema}), controller.register)
userRoutes.get('/', validate({body: listUserSchema}), controller.getUsers)
userRoutes.delete('/:id', validate({params: userIdParamSchema}), controller.deleteUser)
userRoutes.get('/:id', validate({params: userIdParamSchema}), controller.getUser)
