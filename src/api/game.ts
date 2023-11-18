import { GameInsert, GameUpdate } from "src/models/Game";
import { BASEDATABASE, supabase } from "./supabaseClient";

export const SUPABASE_GAME_TABLE = BASEDATABASE + "game";

export const insertGame = (value: GameInsert) =>
  supabase.from(SUPABASE_GAME_TABLE).insert(value).select().single();

export const getGamesByTeamId = (id: string) =>
  supabase
    .from(SUPABASE_GAME_TABLE)
    .select("*, team(*)")
    .not("team", "is", null)
    .eq("team.id", id);

export const getGamesById = (id: string) =>
  supabase
    .from(SUPABASE_GAME_TABLE)
    .select("*, team(*)")
    .eq("id", id)
    .maybeSingle();

export const updateGameById = (id: number, value: GameUpdate) =>
  supabase
    .from(SUPABASE_GAME_TABLE)
    .update(value)
    .eq("id", id)
    .select()
    .single();
