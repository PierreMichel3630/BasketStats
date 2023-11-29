import { Grid, Paper, Typography } from "@mui/material";
import { Game } from "src/models/Game";
import { StatsTeam } from "src/models/Statistique";
import { Colors } from "src/style/Colors";
import {
  getNbreFouls,
  getNbreFoulsOpponent,
  getNbreLf,
  getNbreLfOpponent,
  getPourcentageLFNumber,
} from "src/utils/calcul";
import { LineCompareTable } from "../LineCompareTable";
import { useTranslation } from "react-i18next";

interface Props {
  stats: StatsTeam;
  game: Game;
}

export const TableTeamStats = ({ game, stats }: Props) => {
  const { t } = useTranslation();
  const nbreLfTeam = getNbreLf(stats);

  const nbreLfOpponent = getNbreLfOpponent(stats);

  const foulsTeam = getNbreFouls(stats);

  const foulsOpponent = getNbreFoulsOpponent(stats);

  const data = [
    {
      label: t("commun.pointsabbreviation"),
      value1: stats.game.team_score ?? 0,
      value2: stats.game.opponent_score ?? 0,
    },
    {
      label: t("commun.threepointsabbreviation"),
      value1: stats.threeptsteam ?? 0,
      value2: stats.threeptsopponent ?? 0,
    },
    {
      label: t("commun.twopointsintabbreviation"),
      value1: stats.twoptsintteam ?? 0,
      value2: stats.twoptsintopponent ?? 0,
    },
    {
      label: t("commun.twopointsextabbreviation"),
      value1: stats.twoptsextteam ?? 0,
      value2: stats.twoptsextopponent ?? 0,
    },
    {
      label: t("commun.ftscoredabbreviation"),
      value1: stats.lfteam ?? 0,
      value2: stats.lfopponent ?? 0,
    },
    {
      label: t("commun.ftattemptedabbreviation"),
      value1: nbreLfTeam,
      value2: nbreLfOpponent,
    },
    {
      label: t("commun.ftpercentabbreviation"),
      value1: getPourcentageLFNumber(stats.lfteam ?? 0, nbreLfTeam),
      value2: getPourcentageLFNumber(stats.lfopponent ?? 0, nbreLfOpponent),
      fixed: 1,
    },
    {
      label: t("commun.foulsabbreviation"),
      value1: foulsTeam,
      value2: foulsOpponent,
    },
  ];
  return (
    <Paper
      variant="outlined"
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
                <LineCompareTable value={el} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
