import { Game } from "./Game";
import { Player } from "./Player";
import { Team } from "./Team";

export interface StatsPlayerAvg {
  player: Player;
  team: Team;
  minutes: null | number;
  points: null | number;
  threeptspassed: null | number;
  twoptsintpassed: null | number;
  twoptsextpassed: null | number;
  lfpassed: null | number;
  fouls: null | number;
  games: number;
}

export interface StatsPlayer {
  id: number;
  player: Player;
  game: Game;
  startingfive: boolean;
  minutes: null | number;
  points: null | number;
  number: null | number;
  threeptspassed: null | number;
  twoptsintpassed: null | number;
  twoptsextpassed: null | number;
  lfpassed: null | number;
  fouls: null | number;
}

export interface StatsPlayerInsert {
  player: number;
  game: number;
  startingfive: boolean;
  minutes: null | number;
  points: null | number;
  number: null | number;
  threeptspassed: null | number;
  twoptsintpassed: null | number;
  twoptsextpassed: null | number;
  lfpassed: null | number;
  fouls: null | number;
}

export interface StatsPlayerUpdate {
  id: number;
  player: number;
  game: number;
  startingfive: boolean;
  minutes: null | number;
  points: null | number;
  number: null | number;
  threeptspassed: null | number;
  twoptsintpassed: null | number;
  twoptsextpassed: null | number;
  lfpassed: null | number;
  fouls: null | number;
}

export interface StatsTeam {
  id: number;
  team: Team;
  game: Game;
  q1opponent: null | number;
  q2opponent: null | number;
  q3opponent: null | number;
  q4opponent: null | number;
  q1team: null | number;
  q2team: null | number;
  q3team: null | number;
  q4team: null | number;
  foul0lfopponent: null | number;
  foul1lfopponent: null | number;
  foul2lfopponent: null | number;
  foul3lfopponent: null | number;
  foul0lfteam: null | number;
  foul1lfteam: null | number;
  foul2lfteam: null | number;
  foul3lfteam: null | number;
  "3ptsteam": null | number;
  "2ptsextteam": null | number;
  "2ptsintteam": null | number;
  lfteam: null | number;
  "3ptsopponent": null | number;
  "2ptsextopponent": null | number;
  "2ptsintopponent": null | number;
  lfopponent: null | number;
}

export interface StatsTeamUpdate {
  id: number;
  team: number;
  game: number;
  q1opponent: null | number;
  q2opponent: null | number;
  q3opponent: null | number;
  q4opponent: null | number;
  q1team: null | number;
  q2team: null | number;
  q3team: null | number;
  q4team: null | number;
  foul0lfopponent: null | number;
  foul1lfopponent: null | number;
  foul2lfopponent: null | number;
  foul3lfopponent: null | number;
  foul0lfteam: null | number;
  foul1lfteam: null | number;
  foul2lfteam: null | number;
  foul3lfteam: null | number;
  "3ptsteam": null | number;
  "2ptsextteam": null | number;
  "2ptsintteam": null | number;
  lfteam: null | number;
  "3ptsopponent": null | number;
  "2ptsextopponent": null | number;
  "2ptsintopponent": null | number;
  lfopponent: null | number;
}

export interface StatsTeamInsert {
  team: number;
  game: number;
  q1opponent: null | number;
  q2opponent: null | number;
  q3opponent: null | number;
  q4opponent: null | number;
  q1team: null | number;
  q2team: null | number;
  q3team: null | number;
  q4team: null | number;
  foul0lfopponent: null | number;
  foul1lfopponent: null | number;
  foul2lfopponent: null | number;
  foul3lfopponent: null | number;
  foul0lfteam: null | number;
  foul1lfteam: null | number;
  foul2lfteam: null | number;
  foul3lfteam: null | number;
  "3ptsteam": null | number;
  "2ptsextteam": null | number;
  "2ptsintteam": null | number;
  lfteam: null | number;
  "3ptsopponent": null | number;
  "2ptsextopponent": null | number;
  "2ptsintopponent": null | number;
  lfopponent: null | number;
}
