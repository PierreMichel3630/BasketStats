export enum TypeShoot {
  twoptsint = "twoptsint",
  twoptsext = "twoptsext",
  threepts = "threepts",
}

export enum TimeShoot {
  q1 = "q1",
  q2 = "q2",
  q3 = "q3",
  q4 = "q4",
  p = "p",
}

export interface Shoot {
  id: number;
  x: number;
  y: number;
  type: TypeShoot;
  time: TimeShoot;
  player: number | null;
  team: number | null;
  game: number;
}

export interface ShootInsert {
  player?: number;
  team: number;
  game: number;
  x: number;
  y: number;
  type: TypeShoot;
  time: TimeShoot;
}

export interface ShootUpdate {
  id: number;
  x: number;
  y: number;
  type: TypeShoot;
  time: TimeShoot;
}
