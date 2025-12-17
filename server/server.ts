import express, { type Request, type Response } from "express";
import "dotenv/config";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

const corsOptions = {
  origin: process.env.TRUSTED_ORIGINS?.split(",") || [],
  credential: true,
};

const trustedOriginsList =
  process.env.TRUSTED_ORIGINS?.split(",").map((o) => o.trim()) ?? [];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow server-to-server / same-origin
      if (!origin) return callback(null, true);

      if (trustedOriginsList.includes(origin)) {
        return callback(null, origin); // 👈 echo exact origin
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true, // 👈 REQUIRED
  })
);

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json({limit: '50mb'}))

app.get("/", (req: Request, res: Response) => {
  res.send("Server is Live!");
});

app.use('/api/user', userRouter);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
