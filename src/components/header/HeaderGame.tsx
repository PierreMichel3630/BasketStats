import { Box, Grid, Typography } from "@mui/material";
import { Game } from "src/models/Game";
import { StatsTeam } from "src/models/Statistique";
import { TableScore } from "../table/TableScore";

interface Props {
  game: Game;
  stats: StatsTeam;
}

export const HeaderGame = ({ game, stats }: Props) => {
  const isWin = (game.team_score ?? 0) > (game.opponent_score ?? 0);
  return (
    <Grid container spacing={1} alignItems="center" justifyContent="center">
      <Grid item sm={6} md={4} display={{ xs: "none", md: "block" }}>
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
          <Typography variant="h1" sx={{ fontWeight: isWin ? 700 : 400 }}>
            {game.team_score}
          </Typography>
        </Box>
      </Grid>
      <Grid item sm={4} display={{ xs: "none", md: "block" }}>
        <TableScore stats={stats} game={game} />
      </Grid>
      <Grid item sm={6} md={4} display={{ xs: "none", md: "block" }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            justifyContent: "left",
            ml: 3,
          }}
        >
          <Typography variant="h1" sx={{ fontWeight: !isWin ? 700 : 400 }}>
            {game.opponent_score}
          </Typography>
          <Typography variant="h2">{game.teamopponent.name}</Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={6}
        display={{ xs: "block", md: "none" }}
        sx={{ textAlign: "center" }}
      >
        <Typography variant="h2">{game.team.name}</Typography>
      </Grid>
      <Grid
        item
        xs={6}
        display={{ xs: "block", md: "none" }}
        sx={{ textAlign: "center" }}
      >
        <Typography variant="h2">{game.teamopponent.name}</Typography>
      </Grid>
      <Grid
        item
        xs={6}
        display={{ xs: "block", md: "none" }}
        sx={{ textAlign: "center" }}
      >
        <Typography variant="h1" sx={{ fontWeight: isWin ? 700 : 400 }}>
          {game.team_score}
        </Typography>
      </Grid>
      <Grid
        item
        xs={6}
        display={{ xs: "block", md: "none" }}
        sx={{ textAlign: "center" }}
      >
        <Typography variant="h1" sx={{ fontWeight: !isWin ? 700 : 400 }}>
          {game.opponent_score}
        </Typography>
      </Grid>
      <Grid item xs={12} display={{ xs: "block", md: "none" }}>
        <TableScore stats={stats} game={game} />
      </Grid>
    </Grid>
  );
};
