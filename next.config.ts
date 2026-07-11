import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    GROQ_API_KEY: process.env.GROQ_API_KEY ?? "build-placeholder",
    SESSION_SECRET: process.env.SESSION_SECRET ?? "build-placeholder",
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN ?? "build-placeholder",
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID ?? "build-placeholder",
  },
};

export default nextConfig;
