import { Grid } from "@mui/material";
import { TableAddStatsPlayer } from "../table/TableAddStatsPlayer";
import { Game } from "src/models/Game";
import { Player } from "src/models/Player";

interface Props {
  game: Game;
  players: Array<Player>;
}

export const AddPlayerStatsBlock = ({ game, players }: Props) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TableAddStatsPlayer game={game} players={players} />
      </Grid>
    </Grid>
  );
};
