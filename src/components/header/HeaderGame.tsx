import { Grid, Typography } from "@mui/material";
import { Game } from "src/models/Game";
import { StatsTeam } from "src/models/Statistique";
import { TableScore } from "../table/TableScore";

interface Props {
  game: Game;
  stats: StatsTeam;
}

export const HeaderGame = ({ game, stats }: Props) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h2">{game.team.name}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h2">{game.team_score}</Typography>
      </Grid>
      <Grid item xs={12}>
        <TableScore stats={stats} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h2">{game.opponent_score}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h2">{game.opponent}</Typography>
      </Grid>
    </Grid>
  );
};
