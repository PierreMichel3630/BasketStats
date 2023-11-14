import { TeamInsert } from "src/models/Team";
import { BASEDATABASE, supabase } from "./supabaseClient";

export const SUPABASE_TEAM_TABLE = BASEDATABASE + "team";

export const insertTeam = (value: TeamInsert) =>
  supabase.from(SUPABASE_TEAM_TABLE).insert(value).select().single();

export const getTeamById = (id: string) =>
  supabase.from(SUPABASE_TEAM_TABLE).select().eq("id", id).maybeSingle();

export const getTeamByName = (search: string) =>
  supabase.from(SUPABASE_TEAM_TABLE).select().ilike(`name`, `%${search}%`);
