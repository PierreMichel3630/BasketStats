import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { StatsPlayerAvg } from "src/models/Statistique";
import {
  sortBy3Pts,
  sortByFouls,
  sortByLf,
  sortByPoints,
} from "src/utils/sort";

import { px } from "csx";
import rank1 from "src/assets/rank/rank1.png";
import rank2 from "src/assets/rank/rank2.png";
import rank3 from "src/assets/rank/rank3.png";
import { getBreakpoint } from "src/utils/mediaQuery";
import { style } from "typestyle";

interface Props {
  stats: Array<StatsPlayerAvg>;
}

export const PlayerLeaderBlock = ({ stats }: Props) => {
  const breakpoint = getBreakpoint();
  const isSmall = breakpoint === "xs";

  const fautes: Array<Value> = stats.sort(sortByFouls).map((el) => ({
    label: `${el.player.firstname} ${el.player.lastname}`,
    value: el.fouls ? el.fouls.toFixed(1) : "-",
  }));

  const points: Array<Value> = stats.sort(sortByPoints).map((el) => ({
    label: `${el.player.firstname} ${el.player.lastname}`,
    value: el.points ? el.points.toFixed(1) : "-",
  }));

  const troisPoints: Array<Value> = stats.sort(sortBy3Pts).map((el) => ({
    label: `${el.player.firstname} ${el.player.lastname}`,
    value: el.threeptspassed ? el.threeptspassed.toFixed(1) : "-",
  }));

  const lfs: Array<Value> = stats.sort(sortByLf).map((el) => ({
    label: `${el.player.firstname} ${el.player.lastname}`,
    value: el.lfpassed ? el.lfpassed.toFixed(1) : "-",
  }));
  return (
    <Paper
      elevation={3}
      variant="outlined"
      sx={{ bgcolor: "background.paper" }}
    >
      <Grid container>
        <Grid item xs={12} sx={{ bgcolor: "primary.main", p: 1, mb: 1 }}>
          <Typography variant="h4" color="white">
            TEAM LEADERS
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ p: 1 }}>
          <Grid container spacing={1} columns={{ xs: 1, sm: 2, md: 4 }}>
            <Grid item xs={1}>
              <Card label="Points" values={points} />
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
                <Card label="3PTS" values={troisPoints} />
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
                <Card label="LF" values={lfs} />
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
                <Card label="Fautes" values={fautes} />
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
        <Grid item xs={12} justifyContent="space-between">
          <Grid container spacing={1}>
            <Grid item>{getIcon(index)}</Grid>
            <Grid item xs>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                {el.label}
              </Typography>
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
