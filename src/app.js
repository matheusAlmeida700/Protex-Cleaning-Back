import express from "express";
import cors from "cors";
import morgan from "morgan";
import customerRoutes from "./routes/customerRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());

// Parse JSON payloads and log requests
app.use(express.json());
app.use(morgan("dev"));
app.use(logger);

// Group API routes by entity
app.use("/api/customer", customerRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// Global error handler middleware
app.use(errorHandler);

export default app;
