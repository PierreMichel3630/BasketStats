import { Team } from "./Team";

export interface Game {
  id: number;
  date: Date;
  opponent: string;
  team_score: null | number;
  opponent_score: null | number;
  team: Team;
  is_outside: boolean;
  teamopponent: Team;
}

export interface GameInsert {
  date: Date;
  opponent: string;
  team_score: null;
  opponent_score: null;
  team: number;
  is_outside: boolean;
  teamopponent: number;
}

export interface GameUpdate {
  date?: Date;
  opponent?: string;
  team_score?: number | null;
  opponent_score?: number | null;
  team?: number;
  is_outside?: boolean;
}
