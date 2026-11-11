import express from "express"
import { prisma } from "./db/prisma.js";
import { userRoutes } from "./module/user/user.router.js";
import { issueRoutes } from "./module/issue/issue.router.js";
import { authRoutes } from "./module/auth/auth.router.js";
import { errorHandler, notFoundError } from "./middleware/error.middleware.js";
import { logger } from "./middleware/logger.middleware.js";
import helmet from "helmet";
import { apiLimit } from "./config/rateLimit.js";
import { requestId } from "./middleware/request-id.middleware.js";
import cors from 'cors';
import { projectRoutes } from "./module/project/project.router.js";

export const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(helmet())
app.use(requestId)
app.use(logger)

app.use(apiLimit)
app.use(express.json({
  limit: "100kb",
  strict: true
}))
app.get('/health', async (_request, response, next) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    response.json({
      status: 'ok',
      database: 'connected'
    });
  } catch (error) {
    next(error);
  }
});
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/projects', projectRoutes);

app.use(notFoundError)
app.use(errorHandler)