import { GameInsert } from "src/models/Game";
import { BASEDATABASE, supabase } from "./supabaseClient";

export const SUPABASE_GAME_TABLE = BASEDATABASE + "game";

export const insertGame = (value: GameInsert) =>
  supabase.from(SUPABASE_GAME_TABLE).insert(value).select().single();

export const getGamesByTeamId = (id: string) =>
  supabase.from(SUPABASE_GAME_TABLE).select("*").eq("team", id);

export const getGamesById = (id: string) =>
  supabase
    .from(SUPABASE_GAME_TABLE)
    .select("*, team(*)")
    .eq("id", id)
    .maybeSingle();
