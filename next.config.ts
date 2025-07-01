import { execSync } from "node:child_process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	env: {
		GIT_COMMIT: process.env.NODE_ENV === "production" ? execSync("git rev-parse HEAD").toString().trim() : "DEVMODE",
		BUILD_DATE: Date.now().toString(),
	},
};

export default nextConfig;
