import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { StatsPlayer } from "src/models/Statistique";

import { px } from "csx";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getStatsPlayerByTeamId } from "src/api/statistique";
import rank1 from "src/assets/rank/rank1.png";
import rank2 from "src/assets/rank/rank2.png";
import rank3 from "src/assets/rank/rank3.png";
import { Team } from "src/models/Team";
import { getBreakpoint } from "src/utils/mediaQuery";
import { style } from "typestyle";
import moment from "moment";

interface Props {
  team?: Team;
}

export const PerformanceLeaderBlock = ({ team }: Props) => {
  const { t } = useTranslation();
  const breakpoint = getBreakpoint();
  const isSmall = breakpoint === "xs";

  const [statsPoints, setStatsPoints] = useState<Array<StatsPlayer>>([]);
  const [stats3Points, setStats3Points] = useState<Array<StatsPlayer>>([]);
  const [statsLfs, setStatsLfs] = useState<Array<StatsPlayer>>([]);
  const [statsFautes, setStatsFautes] = useState<Array<StatsPlayer>>([]);

  const getStatsPlayer = () => {
    if (team) {
      getStatsPlayerByTeamId(team.id, "points", 3).then((res) => {
        setStatsPoints(res.data as Array<StatsPlayer>);
      });
      getStatsPlayerByTeamId(team.id, "fouls", 3).then((res) => {
        setStatsFautes(res.data as Array<StatsPlayer>);
      });
      getStatsPlayerByTeamId(team.id, "lfpassed", 3).then((res) => {
        setStatsLfs(res.data as Array<StatsPlayer>);
      });
      getStatsPlayerByTeamId(team.id, "threeptspassed", 3).then((res) => {
        setStats3Points(res.data as Array<StatsPlayer>);
      });
    }
  };

  useEffect(() => {
    getStatsPlayer();
  }, [team]);

  const fautes: Array<Value> = statsFautes.map((el) => ({
    label: `${el.player.firstname} ${el.player.lastname}`,
    sublabel: `contre ${el.game.opponent} (${moment(el.game.date).format(
      "DD/MM"
    )})`,
    to: `/player/${el.player.id}`,
    toSub: `/game/${el.game.id}/stats`,
    value: el.fouls,
  }));

  const points: Array<Value> = statsPoints.map((el) => ({
    label: `${el.player.firstname} ${el.player.lastname}`,
    sublabel: `contre ${el.game.opponent} (${moment(el.game.date).format(
      "DD/MM"
    )})`,
    to: `/player/${el.player.id}`,
    toSub: `/game/${el.game.id}/stats`,
    value: el.points,
  }));

  const troisPoints: Array<Value> = stats3Points.map((el) => ({
    label: `${el.player.firstname} ${el.player.lastname}`,
    sublabel: `contre ${el.game.opponent} (${moment(el.game.date).format(
      "DD/MM"
    )})`,
    to: `/player/${el.player.id}`,
    toSub: `/game/${el.game.id}/stats`,
    value: el.threeptspassed,
  }));

  const lfs: Array<Value> = statsLfs.map((el) => ({
    label: `${el.player.firstname} ${el.player.lastname}`,
    sublabel: `contre ${el.game.opponent} (${moment(el.game.date).format(
      "DD/MM"
    )})`,
    to: `/player/${el.player.id}`,
    toSub: `/game/${el.game.id}/stats`,
    value: el.lfpassed,
  }));

  return (
    <Paper variant="outlined" sx={{ bgcolor: "background.paper" }}>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            bgcolor: "primary.main",
            p: 1,
            mb: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4" color="white" textTransform="uppercase">
            {t("commun.bestperfomance")}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ p: 1 }}>
          <Grid container spacing={1} columns={{ xs: 1, sm: 2, md: 4 }}>
            <Grid item xs={1}>
              <Card label={t("commun.points")} values={points} />
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
                <Card label={t("commun.threepoints")} values={troisPoints} />
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
                <Card label={t("commun.freethrow")} values={lfs} />
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
                <Card label={t("commun.fouls")} values={fautes} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

const imgCss = style({
  width: px(25),
});

interface Value {
  label: string;
  value: number | string;
  sublabel?: string;
  toSub?: string;
  to: string;
}
interface PropsCard {
  label: string;
  values: Array<Value>;
}
const Card = ({ label, values }: PropsCard) => {
  const getIcon = (index: number) => {
    let icon = (
      <Typography variant="h2" sx={{ ml: px(3), mr: px(3) }}>
        {index + 1}
      </Typography>
    );
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
      {[...values].map((el, index) => (
        <Grid item xs={12} key={index}>
          <Grid
            container
            spacing={1}
            alignItems="center"
            alignContent="center"
            justifyContent="space-between"
          >
            <Grid item>{getIcon(index)}</Grid>
            <Grid item xs>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Link to={el.to}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      "&:hover": { color: "secondary.main" },
                    }}
                  >
                    {el.label}
                  </Typography>
                </Link>
                {el.sublabel &&
                  (el.toSub ? (
                    <Link to={el.toSub}>
                      <Typography
                        variant="caption"
                        sx={{
                          "&:hover": { color: "secondary.main" },
                        }}
                      >
                        {el.sublabel}
                      </Typography>
                    </Link>
                  ) : (
                    <Typography
                      variant="caption"
                      sx={{
                        "&:hover": { color: "secondary.main" },
                      }}
                    >
                      {el.sublabel}
                    </Typography>
                  ))}
              </Box>
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
