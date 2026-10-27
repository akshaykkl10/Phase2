import { Router } from "express"
import { UserController } from "./user.controller.js";
import { authUser, requireRole } from "../../middleware/auth.middleware.js";

export const userRoutes = Router();

const controller = new UserController()

userRoutes.use(authUser)
userRoutes.use(requireRole)
userRoutes.post('/register', controller.register)
userRoutes.get('/', controller.getUsers)
userRoutes.delete('/:id', controller.deleteUser)
userRoutes.get('/:id', controller.getUser)
