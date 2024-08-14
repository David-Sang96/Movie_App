import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import { connectDB } from "./config/db.js";
import { ENV_VARS } from "./config/envVars.js";
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";

const app = express();
const PORT = ENV_VARS.PORT;

if (ENV_VARS.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", movieRoutes);

await connectDB();
app.listen(PORT, console.log(`Server is listening on PORT: ${PORT}`));
