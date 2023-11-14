import {
  StatsPlayerInsert,
  StatsPlayerUpdate,
  StatsTeamInsert,
  StatsTeamUpdate,
} from "src/models/Statistique";
import { BASEDATABASE, supabase } from "./supabaseClient";

export const SUPABASE_STATSPLAYER_TABLE = BASEDATABASE + "statsplayer";
export const SUPABASE_STATSTEAM_TABLE = BASEDATABASE + "statsteam";
export const SUPABASE_STATSPLAYERAVG_TABLE =
  BASEDATABASE + "avgstatsplayerbyteam";

export const insertStatsPlayer = (value: StatsPlayerInsert) =>
  supabase.from(SUPABASE_STATSPLAYER_TABLE).insert(value).select().single();

export const updateStatsPlayer = (value: StatsPlayerUpdate) =>
  supabase
    .from(SUPABASE_STATSPLAYER_TABLE)
    .update(value)
    .eq("id", value.id)
    .select()
    .single();

export const getStatsPlayerAvgByTeamId = (id: number) =>
  supabase
    .from(SUPABASE_STATSPLAYERAVG_TABLE)
    .select("*, player(*)")
    .eq("team", id);

export const getStatsPlayerByGameId = (id: number) =>
  supabase
    .from(SUPABASE_STATSPLAYER_TABLE)
    .select("*, player(*)")
    .eq("game", id);

export const insertStatsTeam = (value: StatsTeamInsert) =>
  supabase.from(SUPABASE_STATSTEAM_TABLE).insert(value).select().single();

export const updateStatsTeam = (value: StatsTeamUpdate) =>
  supabase
    .from(SUPABASE_STATSTEAM_TABLE)
    .update(value)
    .eq("id", value.id)
    .select()
    .single();

export const getStatsTeamByGameId = (id: number) =>
  supabase
    .from(SUPABASE_STATSTEAM_TABLE)
    .select("*, team(*)")
    .eq("game", id)
    .maybeSingle();

export const getStatsTeamByTeamId = (id: number) =>
  supabase
    .from(SUPABASE_STATSTEAM_TABLE)
    .select("*, team(*), game(*)")
    .eq("team.id", id);
