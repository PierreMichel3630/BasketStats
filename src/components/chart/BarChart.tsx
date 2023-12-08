import { Grid, Paper, Typography } from "@mui/material";
import moment from "moment";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
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
import { StatsPlayerAvg, StatsTeam } from "src/models/Statistique";
import { Colors } from "src/style/Colors";
import { sortByGameDateAsc } from "src/utils/sort";
import { ToogleButtonTotal } from "../ToogleButton";
import { padding, px } from "csx";

interface Props {
  stats: Array<StatsTeam>;
}

export const BarChartLF = ({ stats }: Props) => {
  const { mode } = useContext(UserContext);
  const { t } = useTranslation();
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
          <Typography variant="h4" color="white" textTransform="uppercase">
            {t("commun.freethrowevolution")}
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
                name={t("commun.freethrowscored")}
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
                name={t("commun.freethrowmiss")}
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

interface PropsCompare {
  stat1: StatsPlayerAvg;
  stat2: StatsPlayerAvg;
}

export const BarCharCompare = ({ stat1, stat2 }: PropsCompare) => {
  const { mode } = useContext(UserContext);
  const { t } = useTranslation();
  const [type, setType] = useState("pergame");
  const isTypeMoy = type === "pergame";

  const games1 = stat1.games ?? 0;
  const games2 = stat2.games ?? 0;
  const totalShoot1 =
    (stat1.lfpassed ?? 0) +
    (stat1.twoptsintpassed ?? 0) +
    (stat1.twoptsextpassed ?? 0) +
    (stat1.threeptspassed ?? 0);
  const totalShoot2 =
    (stat2.lfpassed ?? 0) +
    (stat2.twoptsintpassed ?? 0) +
    (stat2.twoptsextpassed ?? 0) +
    (stat2.threeptspassed ?? 0);

  const datas = [
    {
      name: "LFs",
      value1: isTypeMoy ? stat1.lfpassed ?? 0 : (stat1.lfpassed ?? 0) * games1,
      value2: isTypeMoy ? stat2.lfpassed ?? 0 : (stat2.lfpassed ?? 0) * games2,
    },
    {
      name: "2Pts Int.",
      value1: isTypeMoy
        ? stat1.twoptsintpassed ?? 0
        : (stat1.twoptsintpassed ?? 0) * games1,
      value2: isTypeMoy
        ? stat2.twoptsintpassed ?? 0
        : (stat2.twoptsintpassed ?? 0) * games2,
    },
    {
      name: "2Pts Ext.",
      value1: isTypeMoy
        ? stat1.twoptsextpassed ?? 0
        : (stat1.twoptsextpassed ?? 0) * games1,
      value2: isTypeMoy
        ? stat2.twoptsextpassed ?? 0
        : (stat2.twoptsextpassed ?? 0) * games2,
    },
    {
      name: "3Pts",
      value1: isTypeMoy
        ? stat1.threeptspassed ?? 0
        : (stat1.threeptspassed ?? 0) * games1,
      value2: isTypeMoy
        ? stat2.threeptspassed ?? 0
        : (stat2.threeptspassed ?? 0) * games2,
    },
  ];

  return (
    <Paper
      variant="outlined"
      sx={{ width: "100%", bgcolor: "background.paper" }}
    >
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
            {t("commun.freethrowevolution")}
          </Typography>
          <ToogleButtonTotal
            value={type}
            onChange={(value) => setType(value)}
          />
        </Grid>
        <Grid item xs={12}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={datas}
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
                dataKey="value1"
                fill={Colors.green}
                name={t("commun.freethrowscored")}
              >
                <LabelList
                  dataKey="value1"
                  fill="white"
                  fontWeight={700}
                  fontSize={16}
                />
              </Bar>
              <Bar
                dataKey="value2"
                fill={Colors.red}
                name={t("commun.freethrowmiss")}
              >
                <LabelList
                  dataKey="value2"
                  fill="white"
                  fontWeight={700}
                  fontSize={16}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Paper>
  );
};
