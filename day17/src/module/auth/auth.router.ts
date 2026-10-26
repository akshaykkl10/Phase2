import { Router } from "express"
import { AuthController } from "./auth.controller.js";

export const authRoutes = Router();

const controller = new AuthController

authRoutes.post('/register', controller.register)
authRoutes.get('/users', controller.getUsers)
authRoutes.post('/login', controller.login)
authRoutes.post('/me', controller.me)