import { Grid, Typography } from "@mui/material";
import { StatsPlayerAvg } from "src/models/Statistique";
import { CardStatsPlayer } from "../card/CardStats";
import {
  sortBy3Pts,
  sortByLf,
  sortByMinutes,
  sortByPoints,
} from "src/utils/sort";

interface Props {
  stats: Array<StatsPlayerAvg>;
}

export const PlayerLeaderBlock = ({ stats }: Props) => {
  const orderPoints = stats.sort(sortByPoints)[0];
  const order3Pts = stats.sort(sortBy3Pts)[0];
  const orderLf = stats.sort(sortByLf)[0];
  const orderMinutes = stats.sort(sortByMinutes)[0];

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h4">Team Leaders</Typography>
      </Grid>
      {orderMinutes && orderMinutes.minutes !== null && (
        <Grid item xs={3}>
          <CardStatsPlayer
            player={orderMinutes.player}
            label="Minutes"
            value={orderMinutes.minutes}
          />
        </Grid>
      )}
      {orderPoints && orderPoints.points !== null && (
        <Grid item xs={3}>
          <CardStatsPlayer
            player={orderPoints.player}
            label="Points"
            value={orderPoints.points}
          />
        </Grid>
      )}
      {order3Pts && order3Pts.threeptspassed !== null && (
        <Grid item xs={3}>
          <CardStatsPlayer
            player={order3Pts.player}
            label="3PTS"
            value={order3Pts.threeptspassed}
          />
        </Grid>
      )}
      {orderLf && orderLf.lfpassed !== null && (
        <Grid item xs={3}>
          <CardStatsPlayer
            player={orderLf.player}
            label="LF"
            value={orderLf.lfpassed}
          />
        </Grid>
      )}
    </Grid>
  );
};
