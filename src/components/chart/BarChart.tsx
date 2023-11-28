import { Grid, Paper, Typography } from "@mui/material";
import moment from "moment";
import { useContext } from "react";
import {
  Bar,
  BarChart,
  LabelList,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { UserContext } from "src/App";
import { StatsTeam } from "src/models/Statistique";
import { Colors } from "src/style/Colors";
import { sortByGameDateAsc } from "src/utils/sort";

interface Props {
  stats: Array<StatsTeam>;
}

export const BarChartLF = ({ stats }: Props) => {
  const { mode } = useContext(UserContext);
  const data = stats.sort(sortByGameDateAsc).map((stat) => {
    const succeed = stat.lfteam ?? 0;
    const miss =
      (stat.foul1lfopponent ?? 0) +
      (stat.foul2lfopponent ?? 0) * 2 +
      (stat.foul3lfopponent ?? 0) * 3 -
      (stat.lfteam ?? 0);
    const total = succeed + miss;
    const percent = ((succeed / total) * 100).toFixed(1);
    return {
      name: moment(stat.game.date).format("DD/MM"),
      miss,
      succeed,
      percent,
    };
  });

  return (
    <Paper
      variant="outlined"
      sx={{ width: "100%", bgcolor: "background.paper" }}
    >
      <Grid container>
        <Grid item xs={12} sx={{ bgcolor: "primary.main", p: 1, mb: 1 }}>
          <Typography variant="h4" color="white">
            ÉVOLUTION LANCER FRANC
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{
                top: 0,
                right: 10,
                left: -25,
                bottom: 5,
              }}
            >
              <XAxis
                dataKey="name"
                stroke={mode === "dark" ? "white" : Colors.black}
                fontWeight={700}
                fontSize={10}
              />
              <YAxis
                stroke={mode === "dark" ? "white" : Colors.black}
                fontWeight={700}
                fontSize={10}
              />
              <Legend />
              <Bar
                dataKey="succeed"
                stackId="a"
                fill={Colors.green}
                name="LFs marqués"
              >
                <LabelList
                  dataKey="succeed"
                  fill="white"
                  fontWeight={700}
                  fontSize={16}
                />
              </Bar>
              <Bar
                dataKey="miss"
                stackId="a"
                fill={Colors.red}
                name="LFs Ratés"
              >
                <LabelList
                  dataKey="miss"
                  fill="white"
                  fontWeight={700}
                  fontSize={16}
                />
                <LabelList
                  fill="white"
                  fontWeight={700}
                  fontSize={10}
                  position="top"
                  dataKey="percent"
                  formatter={(value: any) => `${value}%`}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Paper>
  );
};
