import { Grid, Paper, Typography } from "@mui/material";
import { Game } from "src/models/Game";
import { StatsTeam } from "src/models/Statistique";
import { Colors } from "src/style/Colors";
import {
  getLfR,
  getLfROpponent,
  getNbreFouls,
  getNbreFoulsOpponent,
  getNbreLf,
  getNbreLfOpponent,
  getPoints,
  getPointsOpponent,
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

  const pts = getPoints(stats);
  const ptsOpponent = getPointsOpponent(stats);

  const nbreLfTeam = getNbreLf(stats);
  const nbreLfOpponent = getNbreLfOpponent(stats);
  const nbreLfRTeam = getLfR(stats);
  const nbreLfROpponent = getLfROpponent(stats);

  const foulsTeam = getNbreFouls(stats);
  const foulsOpponent = getNbreFoulsOpponent(stats);

  const max = Math.max(pts, ptsOpponent);

  const data = [
    {
      label: t("commun.points"),
      value1: pts,
      value2: ptsOpponent,
      max: max,
    },
    {
      label: t("commun.threepoints"),
      value1: stats.threeptsteam ?? 0,
      value2: stats.threeptsopponent ?? 0,
      max: max,
    },
    {
      label: t("commun.twopointsint"),
      value1: stats.twoptsintteam ?? 0,
      value2: stats.twoptsintopponent ?? 0,
      max: max,
    },
    {
      label: t("commun.twopointsext"),
      value1: stats.twoptsextteam ?? 0,
      value2: stats.twoptsextopponent ?? 0,
      max: max,
    },
    {
      label: t("commun.ftscored"),
      value1: nbreLfRTeam,
      value2: nbreLfROpponent,
      max: max,
    },
    {
      label: t("commun.ftattempted"),
      value1: nbreLfTeam,
      value2: nbreLfOpponent,
      max: max,
    },
    {
      label: t("commun.ftpercent"),
      value1: getPourcentageLFNumber(nbreLfRTeam, nbreLfTeam),
      value2: getPourcentageLFNumber(nbreLfROpponent, nbreLfOpponent),
      fixed: 1,
      max: 100,
    },
    {
      label: t("commun.foulsabbreviation"),
      value1: foulsTeam,
      value2: foulsOpponent,
      max: max,
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
        <Grid item xs={12} sx={{ pl: 1, pr: 1 }}>
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
