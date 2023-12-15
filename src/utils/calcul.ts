import { Shoot, TimeShoot, TypeShoot } from "src/models/Shoot";
import { StatsPlayer, StatsTeam } from "src/models/Statistique";
import { Colors } from "src/style/Colors";

export const getPourcentageLF = (value: number, total: number) =>
  `${getPourcentageLFNumber(value, total).toFixed(1)}`;

export const getPourcentageLFNumber = (value: number, total: number) =>
  (value / total) * 100;

export const isInt = (n: number) => n % 1 === 0;

export const getNbreLf = (stats: StatsTeam) =>
  (stats.foul1lfopponent ?? 0) * 1 +
  (stats.foul2lfopponent ?? 0) * 2 +
  (stats.foul3lfopponent ?? 0) * 3;

export const getLfR = (stats: StatsTeam) =>
  (stats.lfq1team ?? 0) +
  (stats.lfq2team ?? 0) +
  (stats.lfq3team ?? 0) +
  (stats.lfq4team ?? 0) +
  (stats.lfpteam ?? 0);

export const getNbreLfOpponent = (stats: StatsTeam) =>
  (stats.foul1lfteam ?? 0) * 1 +
  (stats.foul2lfteam ?? 0) * 2 +
  (stats.foul3lfteam ?? 0) * 3;

export const getLfROpponent = (stats: StatsTeam) =>
  (stats.lfq1opponent ?? 0) +
  (stats.lfq2opponent ?? 0) +
  (stats.lfq3opponent ?? 0) +
  (stats.lfq4opponent ?? 0) +
  (stats.lfpopponent ?? 0);

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

export const getFouls = (stats: any) =>
  (stats.fouls_0lf ?? 0) +
  (stats.fouls_1lf ?? 0) +
  (stats.fouls_2lf ?? 0) +
  (stats.fouls_3lf ?? 0);

export const getPointsPlayer = (stats: StatsPlayer) =>
  getThreePointsPlayer(stats) * 3 +
  getTwoPointsExtPlayer(stats) * 2 +
  getTwoPointsIntPlayer(stats) * 2 +
  getLfPlayer(stats) * 1;

export const getLfPlayer = (stats: StatsPlayer) =>
  stats.q1lf + stats.q2lf + stats.q3lf + stats.q4lf + stats.plf;

export const getPointsQ1Player = (stats: StatsPlayer) =>
  (stats.threeptsq1 ?? 0) * 3 +
  (stats.twoptsextq1 ?? 0) * 2 +
  (stats.twoptsintq1 ?? 0) +
  (stats.q1lf ?? 0);

export const getPointsQ2Player = (stats: StatsPlayer) =>
  (stats.threeptsq2 ?? 0) * 3 +
  (stats.twoptsextq2 ?? 0) * 2 +
  (stats.twoptsintq2 ?? 0) +
  (stats.q2lf ?? 0);
export const getPointsQ3Player = (stats: StatsPlayer) =>
  (stats.threeptsq3 ?? 0) * 3 +
  (stats.twoptsextq3 ?? 0) * 2 +
  (stats.twoptsintq3 ?? 0) +
  (stats.q3lf ?? 0);
export const getPointsQ4Player = (stats: StatsPlayer) =>
  (stats.threeptsq4 ?? 0) * 3 +
  (stats.twoptsextq4 ?? 0) * 2 +
  (stats.twoptsintq4 ?? 0) +
  (stats.q4lf ?? 0);

export const getThreePointsPlayer = (stats: StatsPlayer) =>
  (stats.threeptsq1 ?? 0) +
  (stats.threeptsq2 ?? 0) +
  (stats.threeptsq3 ?? 0) +
  (stats.threeptsq4 ?? 0) +
  (stats.threeptsp ?? 0);

export const getTwoPointsIntPlayer = (stats: StatsPlayer) =>
  (stats.twoptsintq1 ?? 0) +
  (stats.twoptsintq2 ?? 0) +
  (stats.twoptsintq3 ?? 0) +
  (stats.twoptsintq4 ?? 0) +
  (stats.twoptsintp ?? 0);

export const getTwoPointsExtPlayer = (stats: StatsPlayer) =>
  (stats.twoptsextq1 ?? 0) +
  (stats.twoptsextq2 ?? 0) +
  (stats.twoptsextq3 ?? 0) +
  (stats.twoptsextq4 ?? 0) +
  (stats.twoptsextp ?? 0);

export const getTypeShoot = (x: number, y: number) => {
  const isTwoPtsInt = x >= 34 && x <= 66 && y >= 0 && y <= 41;

  if (isTwoPtsInt) {
    return TypeShoot.twoptsint;
  }
  const RADIUSTHREEPOINTS = 43.9;

  const radius = findRadius({ x, y });

  const isThreePts = radius > RADIUSTHREEPOINTS;

  if (isThreePts) {
    return TypeShoot.threepts;
  } else {
    return TypeShoot.twoptsext;
  }
};

interface Position {
  x: number;
  y: number;
}
export const findCircleCenter = (p1: Position, p2: Position, p3: Position) => {
  const d2 = p2.x * p2.x + p2.y * p2.y;
  const bc = (p1.x * p1.x + p1.y * p1.y - d2) / 2;
  const cd = (d2 - p3.x * p3.x - p3.y * p3.y) / 2;
  const det = (p1.x - p2.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p2.y);
  const x = (bc * (p2.y - p3.y) - cd * (p1.y - p2.y)) / det;
  const y = ((p1.x - p2.x) * cd - (p2.x - p3.x) * bc) / det;

  console.log([x, y]);
};

export const findRadius = (p1: Position) => {
  const centerCircle = {
    x: 50,
    y: 15,
  };
  const radius = Math.sqrt(
    Math.pow(p1.x - centerCircle.x, 2) + Math.pow(p1.y - centerCircle.y, 2)
  );
  return radius;
};

export const getTimeShoot = (value: number) => {
  let time = TimeShoot.p;
  switch (value) {
    case 1:
      time = TimeShoot.q1;
      break;
    case 2:
      time = TimeShoot.q2;
      break;
    case 3:
      time = TimeShoot.q3;
      break;
    case 4:
      time = TimeShoot.q4;
      break;
  }
  return time;
};

export const getColorShoot = (value: TimeShoot) => {
  let color: string = Colors.yellow;
  switch (value) {
    case TimeShoot.q1:
      color = Colors.red;
      break;
    case TimeShoot.q2:
      color = Colors.green;
      break;
    case TimeShoot.q3:
      color = Colors.blue;
      break;
    case TimeShoot.q4:
      color = Colors.orange;
      break;
  }
  return color;
};

export const getNumberShoot = (
  shoots: Array<Shoot>,
  type: TypeShoot,
  time: TimeShoot
) => shoots.filter((el) => el.type === type && el.time === time).length;

export const getPointPlayer = (time: TimeShoot, stats: StatsPlayer) => {
  let points = 0;
  switch (time) {
    case TimeShoot.q1:
      points =
        stats.threeptsq1 * 3 +
        stats.twoptsextq1 * 2 +
        stats.twoptsintq1 * 2 +
        stats.q1lf;
      break;
    case TimeShoot.q2:
      points =
        stats.threeptsq2 * 3 +
        stats.twoptsextq2 * 2 +
        stats.twoptsintq2 * 2 +
        stats.q2lf;
      break;
    case TimeShoot.q3:
      points =
        stats.threeptsq3 * 3 +
        stats.twoptsextq3 * 2 +
        stats.twoptsintq3 * 2 +
        stats.q3lf;
      break;
    case TimeShoot.q4:
      points =
        stats.threeptsq4 * 3 +
        stats.twoptsextq4 * 2 +
        stats.twoptsintq4 * 2 +
        stats.q4lf;
      break;
    case TimeShoot.p:
      points =
        stats.threeptsp * 3 +
        stats.twoptsextp * 2 +
        stats.twoptsintp * 2 +
        stats.plf;
      break;
  }

  return points;
};

export interface Zone {
  type: "rectangular";
  positions: Array<Position>;
}

interface Position {
  x: number;
  y: number;
}
export const getShootsZone = (shoots: Array<Shoot>, zone: Zone) => {
  const x = zone.positions.map((el) => el.x);
  const y = zone.positions.map((el) => el.y);
  const xMax = Math.max(...x);
  const xMin = Math.min(...x);
  const yMax = Math.max(...y);
  const yMin = Math.min(...y);
  const value = shoots.filter(
    (shoot) =>
      shoot.x >= xMin && shoot.x < xMax && shoot.y >= yMin && shoot.y < yMax
  ).length;

  return value;
};
