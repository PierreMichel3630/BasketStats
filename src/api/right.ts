import { BASEDATABASE, supabase } from "./supabaseClient";

export const SUPABASE_RIGHTTEAM_TABLE = BASEDATABASE + "team_right";

export const getMyRightTeam = (id: string) =>
  supabase.from(SUPABASE_RIGHTTEAM_TABLE).select("*").eq("user", id);
