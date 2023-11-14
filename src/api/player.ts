import { AddPlayer, Player, PlayerInsert } from "src/models/Player";
import { BASEDATABASE, supabase } from "./supabaseClient";

export const SUPABASE_PLAYER_TABLE = BASEDATABASE + "player";
export const SUPABASE_TEAMPLAYER_TABLE = BASEDATABASE + "teamplayer";

export const insertPlayer = (value: PlayerInsert) =>
  supabase.from(SUPABASE_PLAYER_TABLE).insert(value).select().single();

export const getPlayersByEquipeId = (id: string) =>
  supabase.from(SUPABASE_TEAMPLAYER_TABLE).select(`player(*)`).eq("team", id);

export const addPlayerToTeam = (player: Player, teamId: number) => {
  const value: AddPlayer = {
    player: player.id,
    team: teamId,
  };
  return supabase
    .from(SUPABASE_TEAMPLAYER_TABLE)
    .insert(value)
    .select()
    .single();
};
