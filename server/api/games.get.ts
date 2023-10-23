import { games } from "../../db/schema";
import { db } from "./sqlite-service";

export default defineEventHandler(async () => {
  try {
    const gamesResp = db.select().from(games).all();
    return { "games" : gamesResp}
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});