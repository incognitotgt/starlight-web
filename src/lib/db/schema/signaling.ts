import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const signalingRoom = pgTable("signaling_room", {
	id: text("id").primaryKey(),
	createdAt: timestamp("createdAt").notNull(),
	updatedAt: timestamp("updatedAt").notNull(),
	ownerId: text("ownerId")
		.notNull()
		.references(() => user.id),
});

export const signalingParticipant = pgTable("signaling_participant", {
	id: text("id").primaryKey(),
	roomId: text("roomId")
		.notNull()
		.references(() => signalingRoom.id),
	userId: text("userId")
		.notNull()
		.references(() => user.id),
	joinedAt: timestamp("joinedAt").notNull(),
});
