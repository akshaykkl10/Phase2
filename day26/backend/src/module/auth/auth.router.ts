import { Router } from "express"
import { AuthController } from "./auth.controller.js";
import { validate } from "../../middleware/validation.middleware.js";
import { loginSchema } from "./auth.shemas.js";
import { loginLimt } from "../../config/rateLimit.js";
import createDebug from 'debug';

export const authRoutes = Router();

const controller = new AuthController

export const debug = createDebug('route:auth')

authRoutes.post('/login', loginLimt, validate({body: loginSchema}), controller.login)
authRoutes.post('/me', controller.me)