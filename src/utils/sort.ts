import moment from "moment";

export const sortByName = (a: any, b: any) =>
  `${a.lastname.toUpperCase()} ${a.firstname}`.localeCompare(
    `${b.lastname.toUpperCase()} ${b.firstname}`
  );

export const sortByMinutes = (a: any, b: any) =>
  (b.minutes ?? 0) - (a.minutes ?? 0);
export const sortByPoints = (a: any, b: any) =>
  (b.points ?? 0) - (a.points ?? 0);
export const sortBy3Pts = (a: any, b: any) =>
  (b.threeptspassed ?? 0) - (a.threeptspassed ?? 0);
export const sortByFouls = (a: any, b: any) => (b.fouls ?? 0) - (a.fouls ?? 0);
export const sortByLf = (a: any, b: any) =>
  (b.lfpassed ?? 0) - (a.lfpassed ?? 0);

export const sortByDateDesc = (a: any, b: any) =>
  moment(b.date).diff(moment(a.date));

export const sortByDateAsc = (a: any, b: any) =>
  moment(a.date).diff(moment(b.date));

export const sortByPourcentageStartingFive = (a: any, b: any) =>
  b.startingfive / b.games - a.startingfive / a.games;
