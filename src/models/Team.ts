export interface Team {
  id: number;
  name: string;
  club: string;
  image: string | null;
  abreviation: string;
}

export interface TeamInsert {
  name: string;
  club: string;
  image: string | null;
}
