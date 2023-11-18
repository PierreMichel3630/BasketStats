import { Box, Grid, Typography } from "@mui/material";
import { Game } from "src/models/Game";
import { StatsTeam } from "src/models/Statistique";
import { TableScore } from "../table/TableScore";

interface Props {
  game: Game;
  stats: StatsTeam;
}

export const HeaderGame = ({ game, stats }: Props) => {
  return (
    <Grid container spacing={1} alignItems="center" justifyContent="center">
      <Grid item xs={6} md={4}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            justifyContent: "right",
            mr: 3,
          }}
        >
          <Typography variant="h2">{game.team.name}</Typography>
          <Typography variant="h1">{game.team_score}</Typography>
        </Box>
      </Grid>
      <Grid item sm={4} display={{ xs: "none", md: "block" }}>
        <TableScore stats={stats} />
      </Grid>
      <Grid item xs={6} md={4}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            justifyContent: "right",
            ml: 3,
          }}
        >
          <Typography variant="h1">{game.opponent_score}</Typography>
          <Typography variant="h2">{game.opponent}</Typography>
        </Box>
      </Grid>
      <Grid item sm={12} display={{ xs: "block", md: "none" }}>
        <TableScore stats={stats} />
      </Grid>
    </Grid>
  );
};
