import express from "express"
import { prisma } from "./db/prisma.js";
import { userRoutes } from "./module/user/user.router.js";
import { ticketRoutes } from "./module/ticket/ticket.router.js";
import { authRoutes } from "./module/auth/auth.router.js";
import { errorHandler, notFoundError } from "./middleware/error.middleware.js";
import { logger } from "./middleware/logger.middleware.js";
import helmet from "helmet";
import { apiLimit } from "./config/rateLimit.js";

export const app = express();

app.use(helmet())
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
app.use('/api/tickets', ticketRoutes);

app.use(notFoundError)
app.use(errorHandler)