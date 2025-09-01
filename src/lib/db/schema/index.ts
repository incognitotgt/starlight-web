import { relations } from "drizzle-orm";
import { boolean, pgTable, text } from "drizzle-orm/pg-core";
import { user } from "./auth";
export const userRelations = relations(user, ({ many }) => ({
	session: many(server),
}));
export const server = pgTable("server", {
	id: text("id").primaryKey(),
	autoLogin: boolean("autoLogin").default(false),
	password: text("password").notNull(),
	userId: text("userId")
		.notNull()
		.references(() => user.id),
});
export const serverRelations = relations(server, ({ one }) => ({
	user: one(user, {
		fields: [server.userId],
		references: [user.id],
	}),
}));
export * from "./auth";
export * from "./signaling";
