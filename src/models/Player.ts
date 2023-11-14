export interface Player {
  id: number;
  firstname: string;
  lastname: string;
  licence: string;
}

export interface PlayerInsert {
  firstname: string;
  lastname: string;
  licence: string;
}

export interface AddPlayer {
  team: number;
  player: number;
}
