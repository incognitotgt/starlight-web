import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const client = neon(process.env.DATABASE_URL as string);
// biome-ignore lint: shadowing is intentional
declare const globalThis: {
	db: ReturnType<typeof drizzleSingleton>;
} & typeof global;
const drizzleSingleton = () => drizzle(client, { schema });

const db = globalThis.db ?? drizzleSingleton();
export { db as default, client };
export * from "./schema";
export type DrizzleClient = NeonHttpDatabase<typeof schema>;
if (process.env.NODE_ENV !== "production") globalThis.db = db;
