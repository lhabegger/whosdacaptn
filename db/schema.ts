import { InferSelectModel, InferInsertModel, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const games = sqliteTable("games", {
  id: integer("id").primaryKey(),
  game_uid: integer("game_uid").notNull(),
  player: text("player_name").notNull(),
  score: integer("score").notNull(),
  location: text("location"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export type Game = InferSelectModel<typeof games>;
export type InsertGame = InferInsertModel<typeof games>;