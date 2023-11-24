import { StatsPlayer, StatsTeam } from "src/models/Statistique";

export const getPourcentageLF = (value: number, total: number) =>
  `${getPourcentageLFNumber(value, total).toFixed(1)}`;

export const getPourcentageLFNumber = (value: number, total: number) =>
  (value / total) * 100;

export const isInt = (n: number) => n % 1 === 0;

export const getNbreLf = (stats: StatsTeam) =>
  (stats.foul1lfopponent ?? 0) * 1 +
  (stats.foul2lfopponent ?? 0) * 2 +
  (stats.foul3lfopponent ?? 0) * 3;

export const getNbreLfOpponent = (stats: StatsTeam) =>
  (stats.foul1lfteam ?? 0) * 1 +
  (stats.foul2lfteam ?? 0) * 2 +
  (stats.foul3lfteam ?? 0) * 3;

export const getNbreFouls = (stats: StatsTeam) =>
  (stats.foul0lfteam ?? 0) +
  (stats.foul1lfteam ?? 0) +
  (stats.foul2lfteam ?? 0) +
  (stats.foul3lfteam ?? 0);

export const getNbreFoulsOpponent = (stats: StatsTeam) =>
  (stats.foul0lfopponent ?? 0) +
  (stats.foul1lfopponent ?? 0) +
  (stats.foul2lfopponent ?? 0) +
  (stats.foul3lfopponent ?? 0);

export const getPoints = (stats: StatsTeam) =>
  (stats.q1team ?? 0) +
  (stats.q2team ?? 0) +
  (stats.q3team ?? 0) +
  (stats.q4team ?? 0);

export const getPointsOpponent = (stats: StatsTeam) =>
  (stats.q1opponent ?? 0) +
  (stats.q2opponent ?? 0) +
  (stats.q3opponent ?? 0) +
  (stats.q4opponent ?? 0);

export const getFouls = (stats: StatsPlayer) =>
  (stats.fouls_0lf ?? 0) +
  (stats.fouls_1lf ?? 0) +
  (stats.fouls_2lf ?? 0) +
  (stats.fouls_3lf ?? 0);
