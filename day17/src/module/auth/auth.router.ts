import { Router } from "express"
import { AuthController } from "./auth.controller.js";

export const authRoutes = Router();

const controller = new AuthController

authRoutes.post('/login', controller.login)
authRoutes.post('/me', controller.me)