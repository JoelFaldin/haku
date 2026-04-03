import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
	id: integer("id").primaryKey({
		autoIncrement: true,
	}),
	fullName: text().notNull(),
	phoneNumber: text().notNull(),
	firstTime: text().notNull(),
	plate: text().notNull(),
	createdAt: integer("created_at", { mode: "timestamp" }).default(
		sql`(unixepoch())`,
	),
});
