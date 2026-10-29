import { Router } from "express"
import { AuthController } from "./auth.controller.js";
import { validate } from "../../middleware/validation.middleware.js";
import { loginSchema } from "./auth.shemas.js";
import { loginLimt } from "../../config/rateLimit.js";

export const authRoutes = Router();

const controller = new AuthController

authRoutes.post('/login', loginLimt, validate({body: loginSchema}), controller.login)
authRoutes.post('/me', controller.me)