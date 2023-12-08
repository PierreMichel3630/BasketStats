import { ShootInsert } from "src/models/Shoot";
import { BASEDATABASE, supabase } from "./supabaseClient";

export const SUPABASE_SHOOT_TABLE = BASEDATABASE + "shoot";

export const insertShoot = (value: ShootInsert) =>
  supabase.from(SUPABASE_SHOOT_TABLE).insert(value).select().single();

export const deleteShootById = (id: number) =>
  supabase.from(SUPABASE_SHOOT_TABLE).delete().eq("id", id);

export const getShootByGameAndPlayer = (game: number, player: number) =>
  supabase
    .from(SUPABASE_SHOOT_TABLE)
    .select()
    .eq("game", game)
    .eq("player", player);

export const getShootByGame = (game: number) =>
  supabase.from(SUPABASE_SHOOT_TABLE).select().eq("game", game);

export const getShootByTeam = (team: number) =>
  supabase.from(SUPABASE_SHOOT_TABLE).select().eq("team", team);

export const getShootInGames = (games: Array<number>) =>
  supabase.from(SUPABASE_SHOOT_TABLE).select().in("game", games);

export const getShootByPlayer = (player: number) =>
  supabase.from(SUPABASE_SHOOT_TABLE).select().eq("player", player);

export const getShootByGameAndTeam = (game: number, team: number) =>
  supabase
    .from(SUPABASE_SHOOT_TABLE)
    .select()
    .eq("game", game)
    .eq("team", team);
