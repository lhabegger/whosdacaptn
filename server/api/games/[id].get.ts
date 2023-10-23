import { games } from "../../../db/schema";
import { db } from "../sqlite-service";
import { eq } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  try {
    // get id as function parameter from route params
    const gameId = event.context.params?.id as string;
    const gameResp = db
      .select()
      .from(games)
      .where(eq(games.game_uid, parseInt(gameId)))
      .all();
    return { game: gameResp };
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});