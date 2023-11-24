import { Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { StatsPlayerAvg } from "src/models/Statistique";
import { Colors } from "src/style/Colors";
import { LineCompareTable } from "../LineCompareTable";
import { SelectStatsPlayer } from "../input/Select";
import { sortByPlayerName } from "src/utils/sort";
import { Player } from "src/models/Player";

interface Props {
  player?: Player;
  stats: Array<StatsPlayerAvg>;
}

export const ComparePlayerBlock = ({ player, stats }: Props) => {
  const VALUES = stats.sort(sortByPlayerName).map((stat) => ({
    label: `${stat.player.firstname} ${stat.player.lastname}`,
    value: stat.player.id,
    stats: stat,
  }));
  const [value1, setValue1] = useState(VALUES[0]);
  const [value2, setValue2] = useState(VALUES[1]);
  const MAX = stats.reduce(
    (acc, value) =>
      Math.max(acc, value.games, value.points ?? 0, value.minutes ?? 0),
    0
  );

  const getValue1 = () => {
    const value0 = player
      ? VALUES.find((el) => el.value === player.id)
      : VALUES[0];
    return player ? (value0 ? value0 : VALUES[0]) : VALUES[0];
  };

  useEffect(() => {
    setValue1(getValue1());
    setValue2(VALUES[1]);
  }, [stats]);

  const datas = [
    {
      label: "PTS",
      value1: value1.stats.points ?? 0,
      value2: value2.stats.points ?? 0,
      fixed: 1,
    },
    {
      label: "3PTS",
      value1: value1.stats.threeptspassed ?? 0,
      value2: value2.stats.threeptspassed ?? 0,
      fixed: 1,
    },
    {
      label: "2PTS INT",
      value1: value1.stats.twoptsintpassed ?? 0,
      value2: value2.stats.twoptsintpassed ?? 0,
      fixed: 1,
    },
    {
      label: "2PTS EXT",
      value1: value1.stats.twoptsextpassed ?? 0,
      value2: value2.stats.twoptsextpassed ?? 0,
      fixed: 1,
    },
    {
      label: "LF",
      value1: value1.stats.lfpassed ?? 0,
      value2: value2.stats.lfpassed ?? 0,
      fixed: 1,
    },
    {
      label: "FAUTES",
      value1: value1.stats.fouls ?? 0,
      value2: value2.stats.fouls ?? 0,
      fixed: 1,
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
              {player ? (
                <>
                  <Typography variant="h2" color="white">
                    {value1.label}
                  </Typography>
                  <Typography variant="h6" color="white">
                    ({value1.stats.games} matchs)
                  </Typography>
                </>
              ) : (
                <SelectStatsPlayer
                  value={value1}
                  results={VALUES}
                  onSelect={(value) => setValue1(value)}
                />
              )}
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={5} sx={{ textAlign: "center" }}>
              <SelectStatsPlayer
                value={value2}
                results={VALUES}
                onSelect={(value) => setValue2(value)}
              />
            </Grid>
          </Grid>
        </Grid>
        {stats.length > 0 && (
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {datas.map((el, index) => (
                <Grid item xs={12} key={index}>
                  <LineCompareTable value={el} max={MAX + 8} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};
