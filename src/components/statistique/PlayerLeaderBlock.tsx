import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { StatsPlayerAvg } from "src/models/Statistique";
import {
  sortBy3Pts,
  sortByFouls,
  sortByLf,
  sortByPoints,
  sortByValue,
} from "src/utils/sort";

import { padding, px } from "csx";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import rank1 from "src/assets/rank/rank1.png";
import rank2 from "src/assets/rank/rank2.png";
import rank3 from "src/assets/rank/rank3.png";
import { getBreakpoint } from "src/utils/mediaQuery";
import { style } from "typestyle";
import { ToogleButtonTotal } from "../ToogleButton";

interface Props {
  stats: Array<StatsPlayerAvg>;
}

export const PlayerLeaderBlock = ({ stats }: Props) => {
  const { t } = useTranslation();
  const GAME_MIN = 3;
  const breakpoint = getBreakpoint();
  const isSmall = breakpoint === "xs";

  const [type, setType] = useState("pergame");

  const statsFilter = stats.filter((el) => el.games >= GAME_MIN);

  const fautesMoy: Array<Value> = statsFilter.sort(sortByFouls).map((el) => ({
    label: `${el.player.firstname} ${el.player.lastname}`,
    to: `/player/${el.player.id}`,
    value: el.fouls ? el.fouls.toFixed(1) : "-",
  }));
  const fautesTot: Array<Value> = statsFilter
    .map((el) => ({
      label: `${el.player.firstname} ${el.player.lastname}`,
      to: `/player/${el.player.id}`,
      value: el.games && el.fouls ? el.fouls * el.games : 0,
    }))
    .sort(sortByValue);

  const pointsMoy: Array<Value> = statsFilter.sort(sortByPoints).map((el) => ({
    label: `${el.player.firstname} ${el.player.lastname}`,
    to: `/player/${el.player.id}`,
    value: el.points ? el.points.toFixed(1) : "-",
  }));
  const pointsTot: Array<Value> = statsFilter
    .map((el) => ({
      label: `${el.player.firstname} ${el.player.lastname}`,
      to: `/player/${el.player.id}`,
      value: el.points && el.games ? el.games * el.points : 0,
    }))
    .sort(sortByValue);

  const troisPointsMoy: Array<Value> = statsFilter
    .sort(sortBy3Pts)
    .map((el) => ({
      label: `${el.player.firstname} ${el.player.lastname}`,
      to: `/player/${el.player.id}`,
      value: el.threeptspassed ? el.threeptspassed.toFixed(1) : "-",
    }));
  const troisPointsTot: Array<Value> = statsFilter
    .map((el) => ({
      label: `${el.player.firstname} ${el.player.lastname}`,
      to: `/player/${el.player.id}`,
      value: el.threeptspassed && el.games ? el.games * el.threeptspassed : 0,
    }))
    .sort(sortByValue);

  const lfsMoy: Array<Value> = statsFilter.sort(sortByLf).map((el) => ({
    label: `${el.player.firstname} ${el.player.lastname}`,
    to: `/player/${el.player.id}`,
    value: el.lfpassed ? el.lfpassed.toFixed(1) : "-",
  }));
  const lfsTot: Array<Value> = statsFilter
    .map((el) => ({
      label: `${el.player.firstname} ${el.player.lastname}`,
      to: `/player/${el.player.id}`,
      value: el.lfpassed && el.games ? el.games * el.lfpassed : 0,
    }))
    .sort(sortByValue);

  const isTypeMoy = type === "pergame";
  return (
    stats.length > 0 && (
      <Paper variant="outlined" sx={{ bgcolor: "background.paper" }}>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              bgcolor: "primary.main",
              p: padding(px(2), px(8)),
              mb: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4" color="white" textTransform="uppercase">
              {t("commun.teamleaders")}
            </Typography>
            <ToogleButtonTotal
              value={type}
              onChange={(value) => setType(value)}
            />
          </Grid>
          <Grid item xs={12} sx={{ p: 1 }}>
            <Grid container spacing={1} columns={{ xs: 1, sm: 2, md: 4 }}>
              <Grid item xs={1}>
                <Card
                  label={t("commun.points")}
                  values={isTypeMoy ? pointsMoy : pointsTot}
                />
              </Grid>
              <Grid item xs={1}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexDirection: isSmall ? "column" : "row",
                  }}
                >
                  <Divider
                    orientation={isSmall ? "horizontal" : "vertical"}
                    flexItem
                  />
                  <Card
                    label={t("commun.threepoints")}
                    values={isTypeMoy ? troisPointsMoy : troisPointsTot}
                  />
                </Box>
              </Grid>
              <Grid item xs={1}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexDirection: isSmall ? "column" : "row",
                  }}
                >
                  <Divider
                    orientation={isSmall ? "horizontal" : "vertical"}
                    flexItem
                  />
                  <Card
                    label={t("commun.freethrow")}
                    values={isTypeMoy ? lfsMoy : lfsTot}
                  />
                </Box>
              </Grid>
              <Grid item xs={1}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexDirection: isSmall ? "column" : "row",
                  }}
                >
                  <Divider
                    orientation={isSmall ? "horizontal" : "vertical"}
                    flexItem
                  />
                  <Card
                    label={t("commun.fouls")}
                    values={isTypeMoy ? fautesMoy : fautesTot}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    )
  );
};

const imgCss = style({
  width: px(25),
});

interface Value {
  label: string;
  value: number | string;
  to: string;
}
interface PropsCard {
  label: string;
  values: Array<Value>;
}
const Card = ({ label, values }: PropsCard) => {
  const getIcon = (index: number) => {
    let icon = <Typography variant="h6">{index + 1}</Typography>;
    switch (index + 1) {
      case 1:
        icon = <img src={rank1} className={imgCss} />;
        break;
      case 2:
        icon = <img src={rank2} className={imgCss} />;
        break;
      case 3:
        icon = <img src={rank3} className={imgCss} />;
        break;
    }
    return icon;
  };
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h4">{label}</Typography>
      </Grid>
      {[...values].splice(0, 3).map((el, index) => (
        <Grid item xs={12} justifyContent="space-between" key={index}>
          <Grid container spacing={1}>
            <Grid item>{getIcon(index)}</Grid>
            <Grid item xs>
              <Link to={el.to}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 500,
                    "&:hover": { color: "secondary.main" },
                  }}
                >
                  {el.label}
                </Typography>
              </Link>
            </Grid>
            <Grid item>
              <Typography variant="h4">{el.value}</Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};
