export enum TypeTeam {
  TEAM = "TEAM",
  OPPONENT = "OPPONENT",
}

export interface Team {
  id: number;
  name: string;
  club: string;
  image: string | null;
  abreviation: string;
  type: TypeTeam;
}

export interface TeamInsert {
  name: string;
  club: string | null;
  image: string | null;
  type: TypeTeam;
}
