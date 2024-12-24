import { index, text, sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { facility } from "./facility";
import { sql } from "drizzle-orm";

/* 
This represents the ENTRANCE page in excel
*/
export const users = sqliteTable("users", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    facility_id: integer("facility_id").references(() => facility.id),
    name: text("name"),
    email: text("email"),
    password: text("password"),
    role: text("role", {enum: ["admin", "engineer"]}),
    createdAt: text().default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text().default(sql`(CURRENT_TIMESTAMP)`),
    deletedAt: text().default("NULL")
});