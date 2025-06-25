import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "./db"
import * as authSchema from "./db/schema";

export const auth = betterAuth({
	appName: "Starlight",
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: {
			...authSchema,
			session: authSchema.authSession,
		},
	}),
});
