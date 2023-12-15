import { Game } from "./Game";
import { Player } from "./Player";
import { Team } from "./Team";

export interface PlayerAvg {
  team: Team;
  minutes: null | number;
  points: null | number;
  threeptspassed: null | number;
  twoptsintpassed: null | number;
  twoptsextpassed: null | number;
  lfpassed: null | number;
  fouls: null | number;
  games: number;
  startingfive: number;
}

export interface StatsPlayerAvg {
  player: Player;
  team: Team;
  minutes: null | number;
  points: null | number;
  threeptspassed: null | number;
  twoptsintpassed: null | number;
  twoptsextpassed: null | number;
  lfpassed: null | number;
  fouls_0lf: null | number;
  fouls_1lf: null | number;
  fouls_2lf: null | number;
  fouls_3lf: null | number;
  fouls: null | number;
  games: number;
  startingfive: number;
}

export interface StatsPlayer {
  id: number;
  player: Player;
  game: Game;
  is_play: boolean;
  startingfive: boolean;
  minutes: null | number;
  points: number;
  number: null | number;
  threeptspassed: number;
  twoptsintpassed: number;
  twoptsextpassed: number;
  lfpassed: number;
  fouls: number;
  fouls_0lf: null | number;
  fouls_1lf: null | number;
  fouls_2lf: null | number;
  fouls_3lf: null | number;
  q1lf: number;
  q2lf: number;
  q3lf: number;
  q4lf: number;
  plf: number;
  threeptsq1: number;
  threeptsq2: number;
  threeptsq3: number;
  threeptsq4: number;
  threeptsp: number;
  twoptsextq1: number;
  twoptsextq2: number;
  twoptsextq3: number;
  twoptsextq4: number;
  twoptsextp: number;
  twoptsintq1: number;
  twoptsintq2: number;
  twoptsintq3: number;
  twoptsintq4: number;
  twoptsintp: number;
}

export interface StatsPlayerInsert {
  player: number;
  game: number;
  is_play: boolean;
  startingfive: boolean;
  minutes?: null | number;
  points?: null | number;
  number: null | number;
  threeptspassed?: null | number;
  twoptsintpassed?: null | number;
  twoptsextpassed?: null | number;
  fouls_0lf: null | number;
  fouls_1lf: null | number;
  fouls_2lf: null | number;
  fouls_3lf: null | number;
  q1lf: number;
  q2lf: number;
  q3lf: number;
  q4lf: number;
}

export interface StatsPlayerUpdate {
  id: number;
  player: number;
  game: number;
  is_play: boolean;
  startingfive: boolean;
  minutes?: null | number;
  points?: null | number;
  number: null | number;
  fouls_0lf: null | number;
  fouls_1lf: null | number;
  fouls_2lf: null | number;
  fouls_3lf: null | number;
  q1lf: number;
  q2lf: number;
  q3lf: number;
  q4lf: number;
  plf: number;
  threeptsq1?: number;
  threeptsq2?: number;
  threeptsq3?: number;
  threeptsq4?: number;
  threeptsp?: number;
  twoptsextq1?: number;
  twoptsextq2?: number;
  twoptsextq3?: number;
  twoptsextq4?: number;
  twoptsextp?: number;
  twoptsintq1?: number;
  twoptsintq2?: number;
  twoptsintq3?: number;
  twoptsintq4?: number;
  twoptsintp?: number;
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
  threeptsteam: null | number;
  twoptsextteam: null | number;
  twoptsintteam: null | number;
  lfteam: null | number;
  lfq1team: null | number;
  lfq2team: null | number;
  lfq3team: null | number;
  lfq4team: null | number;
  lfpteam: null | number;
  threeptsopponent: null | number;
  twoptsextopponent: null | number;
  twoptsintopponent: null | number;
  lfopponent: null | number;
  lfq1opponent: null | number;
  lfq2opponent: null | number;
  lfq3opponent: null | number;
  lfq4opponent: null | number;
  lfpopponent: null | number;
}

export interface StatsTeamUpdate {
  id: number;
  team: number;
  game: number;
  q1opponent?: null | number;
  q2opponent?: null | number;
  q3opponent?: null | number;
  q4opponent?: null | number;
  q1team?: null | number;
  q2team?: null | number;
  q3team?: null | number;
  q4team?: null | number;
  foul0lfopponent?: null | number;
  foul1lfopponent?: null | number;
  foul2lfopponent?: null | number;
  foul3lfopponent?: null | number;
  foul0lfteam?: null | number;
  foul1lfteam?: null | number;
  foul2lfteam?: null | number;
  foul3lfteam?: null | number;
  threeptsteam?: null | number;
  twoptsextteam?: null | number;
  twoptsintteam?: null | number;
  lfteam?: null | number;
  lfq1team?: null | number;
  lfq2team?: null | number;
  lfq3team?: null | number;
  lfq4team?: null | number;
  lfpteam?: null | number;
  threeptsopponent?: null | number;
  twoptsextopponent?: null | number;
  twoptsintopponent?: null | number;
  lfopponent?: null | number;
  lfq1opponent?: null | number;
  lfq2opponent?: null | number;
  lfq3opponent?: null | number;
  lfq4opponent?: null | number;
  lfpopponent?: null | number;
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
  threeptsteam: null | number;
  twoptsextteam: null | number;
  twoptsintteam: null | number;
  lfteam: null | number;
  threeptsopponent: null | number;
  twoptsextopponent: null | number;
  twoptsintopponent: null | number;
  lfopponent: null | number;
  lfq1opponent: null | number;
  lfq2opponent: null | number;
  lfq3opponent: null | number;
  lfq4opponent: null | number;
  lfpopponent: null | number;
}
