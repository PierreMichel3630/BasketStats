import moment from "moment";
export const sortByNumber = (a: any, b: any) => a.number - b.number;
export const sortByValue = (a: any, b: any) => b.value - a.value;
export const sortByPlayerName = (a: any, b: any) =>
  `${a.player.firstname} ${a.player.lastname.toUpperCase()}`.localeCompare(
    `${b.player.firstname} ${b.player.lastname.toUpperCase()}`
  );

export const sortByName = (a: any, b: any) =>
  `${a.firstname} ${a.lastname.toUpperCase()}`.localeCompare(
    `${b.firstname} ${b.lastname.toUpperCase()}`
  );

export const sortByMinutes = (a: any, b: any) =>
  (b.minutes ?? 0) - (a.minutes ?? 0);
export const sortByPoints = (a: any, b: any) =>
  (b.points ?? 0) - (a.points ?? 0);
export const sortBy3Pts = (a: any, b: any) =>
  (b.threeptspassed ?? 0) - (a.threeptspassed ?? 0);
export const sortByFouls = (a: any, b: any) => {
  const foulsA =
    (a.fouls_0lf ?? 0) +
    (a.fouls_1lf ?? 0) +
    (a.fouls_2lf ?? 0) +
    (a.fouls_3lf ?? 0);
  const foulsB =
    (b.fouls_0lf ?? 0) +
    (b.fouls_1lf ?? 0) +
    (b.fouls_2lf ?? 0) +
    (b.fouls_3lf ?? 0);
  return foulsB - foulsA;
};
export const sortByLf = (a: any, b: any) =>
  (b.lfpassed ?? 0) - (a.lfpassed ?? 0);

export const sortByDateDesc = (a: any, b: any) =>
  moment(b.date).diff(moment(a.date));

export const sortByDateAsc = (a: any, b: any) =>
  moment(a.date).diff(moment(b.date));

export const sortByGameDateAsc = (a: any, b: any) =>
  moment(a.game.date).diff(moment(b.game.date));

export const sortByGameDateDesc = (a: any, b: any) =>
  moment(b.game.date).diff(moment(a.game.date));

export const sortByPourcentageStartingFive = (a: any, b: any) =>
  b.startingfive / b.games - a.startingfive / a.games;

export const sortByStartingFive = (a: any, b: any) =>
  b.startingfive - a.startingfive;

export const sortByPercent = (a: any, b: any) => b.percent - a.percent;
