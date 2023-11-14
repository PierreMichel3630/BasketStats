import { Team } from "./Team";

export interface Game {
  id: number;
  date: Date;
  opponent: string;
  team_score: null | number;
  opponent_score: null | number;
  team: Team;
  is_outside: boolean;
}

export interface GameInsert {
  date: Date;
  opponent: string;
  team_score: null;
  opponent_score: null;
  team: number;
  is_outside: boolean;
}
