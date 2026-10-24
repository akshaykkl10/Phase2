import { Router } from "express"
import { AuthController } from "./auth.controller.js";

export const authRoutes = Router();

const controller = new AuthController

authRoutes.post('/register', controller.register)
// authRoutes.post('/login')
// authRoutes.post('/me')