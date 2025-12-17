import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma.js";
import "dotenv/config";

const trustedOriginsList =
  process.env.TRUSTED_ORIGINS?.split(",").map((o) => o.trim()) ?? [];

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: (req) => {
    const origin = req.headers.get("origin");

    // same-origin / server-side
    if (!origin) return trustedOriginsList;

    // allow only matching origin
    return trustedOriginsList.includes(origin) ? [origin] : [];
  },
  baseURL: process.env.BETTER_AUTH_URL!,
  secret: process.env.BETTER_AUTH_SECRET!,
  advanced: {
    cookies: {
      session_token: {
        name: "auth_session",
        attributes: {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          path: "/",
        },
      },
    },
  },
});
