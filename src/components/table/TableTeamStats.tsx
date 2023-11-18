import { Box, Grid, Paper, Typography } from "@mui/material";
import { percent, px } from "csx";
import { Game } from "src/models/Game";
import { StatsTeam } from "src/models/Statistique";
import { Colors } from "src/style/Colors";
import { getPourcentageLFNumber } from "src/utils/calcul";

interface Value {
  label: string;
  value1: number;
  value2: number;
  fixed?: number;
}

interface Props {
  stats: StatsTeam;
  game: Game;
}

export const TableTeamStats = ({ game, stats }: Props) => {
  const nbreLfTeam =
    (stats.foul1lfopponent ?? 0) * 1 +
    (stats.foul2lfopponent ?? 0) * 2 +
    (stats.foul3lfopponent ?? 0) * 3;

  const nbreLfOpponent =
    (stats.foul1lfteam ?? 0) * 1 +
    (stats.foul2lfteam ?? 0) * 2 +
    (stats.foul3lfteam ?? 0) * 3;

  const foulsTeam =
    (stats.foul0lfteam ?? 0) +
    (stats.foul1lfteam ?? 0) +
    (stats.foul2lfteam ?? 0) +
    (stats.foul3lfteam ?? 0);

  const foulsOpponent =
    (stats.foul0lfopponent ?? 0) +
    (stats.foul1lfopponent ?? 0) +
    (stats.foul2lfopponent ?? 0) +
    (stats.foul3lfopponent ?? 0);

  const data: Array<Value> = [
    {
      label: "PTS",
      value1: stats.game.team_score ?? 0,
      value2: stats.game.opponent_score ?? 0,
    },
    {
      label: "3PTS",
      value1: stats.threeptsteam ?? 0,
      value2: stats.threeptsopponent ?? 0,
    },
    {
      label: "2PTS Int.",
      value1: stats.twoptsintteam ?? 0,
      value2: stats.twoptsintopponent ?? 0,
    },
    {
      label: "2PTS Ext.",
      value1: stats.twoptsextteam ?? 0,
      value2: stats.twoptsextopponent ?? 0,
    },
    {
      label: "LFR",
      value1: stats.lfteam ?? 0,
      value2: stats.lfopponent ?? 0,
    },
    {
      label: "LFT",
      value1: nbreLfTeam,
      value2: nbreLfOpponent,
    },
    {
      label: "%LF",
      value1: getPourcentageLFNumber(stats.lfteam ?? 0, nbreLfTeam),
      value2: getPourcentageLFNumber(stats.lfopponent ?? 0, nbreLfOpponent),
      fixed: 1,
    },
    {
      label: "PF",
      value1: foulsTeam,
      value2: foulsOpponent,
    },
  ];
  return (
    <Paper
      elevation={3}
      sx={{ width: "100%", bgcolor: "background.paper", pb: 2 }}
    >
      <Grid container>
        <Grid item xs={12} sx={{ bgcolor: Colors.subprimary, p: 1, mb: 1 }}>
          <Grid container alignItems="center">
            <Grid item xs={5} sx={{ textAlign: "center" }}>
              <Typography variant="h2" color="white">
                {game.team.name}
              </Typography>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={5} sx={{ textAlign: "center" }}>
              <Typography variant="h2" color="white">
                {game.opponent}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {data.map((el) => (
              <Grid item xs={12}>
                <LineTable value={el} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

interface PropsLine {
  value: Value;
}

export const LineTable = ({ value }: PropsLine) => {
  const isWin = value.value1 > value.value2;
  return (
    <Grid container alignItems="center">
      <Grid
        item
        xs={5}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          color={isWin ? "primary.main" : "secondary.main"}
        >
          {value.fixed ? value.value1.toFixed(value.fixed) : value.value1}
        </Typography>
        <Box
          sx={{
            width: percent(value.value1),
            height: px(25),
            bgcolor: isWin ? "primary.main" : "secondary.main",
          }}
        />
      </Grid>
      <Grid item xs={2} sx={{ textAlign: "center" }}>
        <Typography variant="h4">{value.label.toUpperCase()}</Typography>
      </Grid>
      <Grid
        item
        xs={5}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: percent(value.value2),
            height: px(25),
            bgcolor: !isWin ? "primary.main" : "secondary.main",
          }}
        />
        <Typography
          variant="h4"
          color={!isWin ? "primary.main" : "secondary.main"}
        >
          {value.fixed ? value.value2.toFixed(value.fixed) : value.value2}
        </Typography>
      </Grid>
    </Grid>
  );
};
