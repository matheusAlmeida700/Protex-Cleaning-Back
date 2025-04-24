import express from "express";
import cors from "cors";
import morgan from "morgan";
import customerRoutes from "./routes/customerRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import historyRoutes from "./routes/historyEntryRoutes.js";
import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(morgan("dev"));
app.use(logger);

app.use("/api/customer", customerRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/history", historyRoutes);

app.use(errorHandler);

export default app;
