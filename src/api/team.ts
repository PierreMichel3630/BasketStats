import { TeamInsert, TypeTeam } from "src/models/Team";
import { BASEDATABASE, supabase } from "./supabaseClient";
import { SUPABASE_TEAMPLAYER_TABLE } from "./player";

export const SUPABASE_TEAM_TABLE = BASEDATABASE + "team";

export const insertTeam = (value: TeamInsert) =>
  supabase.from(SUPABASE_TEAM_TABLE).insert(value).select().single();

export const getTeamById = (id: string) =>
  supabase.from(SUPABASE_TEAM_TABLE).select().eq("id", id).maybeSingle();

export const getTeamByName = (search: string) =>
  supabase
    .from(SUPABASE_TEAM_TABLE)
    .select()
    .ilike(`name`, `%${search}%`)
    .eq("type", TypeTeam.TEAM);

export const getTeamByPlayerId = (id: number) =>
  supabase
    .from(SUPABASE_TEAMPLAYER_TABLE)
    .select("*, player(*), team(*)")
    .not("player", "is", null)
    .eq("player.id", id);
