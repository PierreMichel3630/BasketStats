import { Grid, Paper, Typography } from "@mui/material";
import moment from "moment";
import {
  Bar,
  BarChart,
  LabelList,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { StatsTeam } from "src/models/Statistique";
import { Colors } from "src/style/Colors";
import { sortByGameDateAsc } from "src/utils/sort";

interface Props {
  stats: Array<StatsTeam>;
}

export const BarChartLF = ({ stats }: Props) => {
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
              width={500}
              height={300}
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
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
                  fontSize={20}
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
