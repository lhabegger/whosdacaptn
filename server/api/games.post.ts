import { games, InsertGame } from "@/db/schema";
import { db } from "@/server/api/sqlite-service";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const newGame: InsertGame = {
      ...body
    }
    const result = db.insert(games).values(newGame).run();
    return { newGame : result}
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});