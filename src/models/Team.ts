export interface Team {
  id: number;
  name: string;
  club: string;
  image: string | null;
}

export interface TeamInsert {
  name: string;
  club: string;
  image: string | null;
}
