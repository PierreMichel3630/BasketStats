import { Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { StatsTeam } from "src/models/Statistique";
import { Colors } from "src/style/Colors";
import {
  getNbreLf,
  getNbreLfOpponent,
  getPoints,
  getPointsOpponent,
  getPourcentageLFNumber,
} from "src/utils/calcul";
import { LineCompareTable } from "../LineCompareTable";
import { SelectStatsTeam } from "../input/Select";

interface Props {
  stats: Array<StatsTeam>;
}

export const CompareTeamBlock = ({ stats }: Props) => {
  const getStatsMatchVictoire = () =>
    stats.filter(
      (el) =>
        el.game.team_score !== null &&
        el.game.opponent_score !== null &&
        el.game.team_score > el.game.opponent_score
    );

  const getStatsMatchDefaite = () =>
    stats.filter(
      (el) =>
        el.game.team_score !== null &&
        el.game.opponent_score !== null &&
        el.game.team_score < el.game.opponent_score
    );
  const getStatsMatchDomicile = () => stats.filter((el) => !el.game.is_outside);
  const getStatsMatchExterieur = () => stats.filter((el) => el.game.is_outside);

  const VALUES = [
    {
      label: "Victoires",
      value: "victoires",
      stats: getStatsMatchVictoire(),
    },
    {
      label: "Défaites",
      value: "defaites",
      stats: getStatsMatchDefaite(),
    },
    {
      label: "Domicile",
      value: "domicile",
      stats: getStatsMatchDomicile(),
    },
    {
      label: "Extérieur",
      value: "exterieur",
      stats: getStatsMatchExterieur(),
    },
    {
      label: "Moyenne Match",
      value: "moyenne",
      stats: stats,
    },
  ];
  const [value1, setValue1] = useState(VALUES[0]);
  const [value2, setValue2] = useState(VALUES[1]);

  useEffect(() => {
    setValue1(VALUES[0]);
    setValue2(VALUES[1]);
  }, [stats]);

  const lfR1 =
    value1.stats.reduce((acc, value) => acc + (value.lfteam ?? 0), 0) /
    value1.stats.length;
  const lfR2 =
    value2.stats.reduce((acc, value) => acc + (value.lfteam ?? 0), 0) /
    value2.stats.length;
  const lfT1 =
    value1.stats.reduce((acc, value) => acc + getNbreLf(value), 0) /
    value1.stats.length;
  const lfT2 =
    value2.stats.reduce((acc, value) => acc + getNbreLf(value), 0) /
    value2.stats.length;

  const lfRAdv1 =
    value1.stats.reduce((acc, value) => acc + (value.lfopponent ?? 0), 0) /
    value1.stats.length;
  const lfRAdv2 =
    value2.stats.reduce((acc, value) => acc + (value.lfopponent ?? 0), 0) /
    value2.stats.length;
  const lfTAdv1 =
    value1.stats.reduce((acc, value) => acc + getNbreLfOpponent(value), 0) /
    value1.stats.length;
  const lfTAdv2 =
    value2.stats.reduce((acc, value) => acc + getNbreLfOpponent(value), 0) /
    value2.stats.length;

  const datas = [
    {
      label: "PTS MARQUES",
      value1:
        value1.stats.reduce((acc, value) => acc + getPoints(value), 0) /
        value1.stats.length,
      value2:
        value2.stats.reduce((acc, value) => acc + getPoints(value), 0) /
        value2.stats.length,
      fixed: 1,
    },
    {
      label: "Q1",
      value1:
        value1.stats.reduce((acc, value) => acc + (value.q1team ?? 0), 0) /
        value1.stats.length,
      value2:
        value2.stats.reduce((acc, value) => acc + (value.q1team ?? 0), 0) /
        value2.stats.length,
      fixed: 1,
    },
    {
      label: "Q2",
      value1:
        value1.stats.reduce((acc, value) => acc + (value.q2team ?? 0), 0) /
        value1.stats.length,
      value2:
        value2.stats.reduce((acc, value) => acc + (value.q2team ?? 0), 0) /
        value2.stats.length,
      fixed: 1,
    },
    {
      label: "Q3",
      value1:
        value1.stats.reduce((acc, value) => acc + (value.q3team ?? 0), 0) /
        value1.stats.length,
      value2:
        value2.stats.reduce((acc, value) => acc + (value.q3team ?? 0), 0) /
        value2.stats.length,
      fixed: 1,
    },
    {
      label: "Q4",
      value1:
        value1.stats.reduce((acc, value) => acc + (value.q4team ?? 0), 0) /
        value1.stats.length,
      value2:
        value2.stats.reduce((acc, value) => acc + (value.q4team ?? 0), 0) /
        value2.stats.length,
      fixed: 1,
    },
    {
      label: "PTS ENCAISSES",
      value1:
        value1.stats.reduce((acc, value) => acc + getPointsOpponent(value), 0) /
        value1.stats.length,
      value2:
        value2.stats.reduce((acc, value) => acc + getPointsOpponent(value), 0) /
        value2.stats.length,
      fixed: 1,
    },
    {
      label: "Q1",
      value1:
        value1.stats.reduce((acc, value) => acc + (value.q1opponent ?? 0), 0) /
        value1.stats.length,
      value2:
        value2.stats.reduce((acc, value) => acc + (value.q1opponent ?? 0), 0) /
        value2.stats.length,
      fixed: 1,
    },
    {
      label: "Q2",
      value1:
        value1.stats.reduce((acc, value) => acc + (value.q2opponent ?? 0), 0) /
        value1.stats.length,
      value2:
        value2.stats.reduce((acc, value) => acc + (value.q2opponent ?? 0), 0) /
        value2.stats.length,
      fixed: 1,
    },
    {
      label: "Q3",
      value1:
        value1.stats.reduce((acc, value) => acc + (value.q3opponent ?? 0), 0) /
        value1.stats.length,
      value2:
        value2.stats.reduce((acc, value) => acc + (value.q3opponent ?? 0), 0) /
        value2.stats.length,
      fixed: 1,
    },
    {
      label: "Q4",
      value1:
        value1.stats.reduce((acc, value) => acc + (value.q4opponent ?? 0), 0) /
        value1.stats.length,
      value2:
        value2.stats.reduce((acc, value) => acc + (value.q4opponent ?? 0), 0) /
        value2.stats.length,
      fixed: 1,
    },
    {
      label: "3PTS MARQUES",
      value1:
        value1.stats.reduce(
          (acc, value) => acc + (value.threeptsteam ?? 0),
          0
        ) / value1.stats.length,
      value2:
        value2.stats.reduce(
          (acc, value) => acc + (value.threeptsteam ?? 0),
          0
        ) / value2.stats.length,
      fixed: 1,
    },
    {
      label: "3PTS ENCAISSES",
      value1:
        value1.stats.reduce(
          (acc, value) => acc + (value.threeptsopponent ?? 0),
          0
        ) / value1.stats.length,
      value2:
        value2.stats.reduce(
          (acc, value) => acc + (value.threeptsopponent ?? 0),
          0
        ) / value2.stats.length,
      fixed: 1,
    },
    {
      label: "2PTS INT MARQUES",
      value1:
        value1.stats.reduce(
          (acc, value) => acc + (value.twoptsintteam ?? 0),
          0
        ) / value1.stats.length,
      value2:
        value2.stats.reduce(
          (acc, value) => acc + (value.twoptsintteam ?? 0),
          0
        ) / value2.stats.length,
      fixed: 1,
    },
    {
      label: "2PTS INT ENCAISSES",
      value1:
        value1.stats.reduce(
          (acc, value) => acc + (value.twoptsintopponent ?? 0),
          0
        ) / value1.stats.length,
      value2:
        value2.stats.reduce(
          (acc, value) => acc + (value.twoptsintopponent ?? 0),
          0
        ) / value2.stats.length,
      fixed: 1,
    },
    {
      label: "2PTS EXT MARQUES",
      value1:
        value1.stats.reduce(
          (acc, value) => acc + (value.twoptsextteam ?? 0),
          0
        ) / value1.stats.length,
      value2:
        value2.stats.reduce(
          (acc, value) => acc + (value.twoptsextteam ?? 0),
          0
        ) / value2.stats.length,
      fixed: 1,
    },
    {
      label: "2PTS EXT ENCAISSES",
      value1:
        value1.stats.reduce(
          (acc, value) => acc + (value.twoptsextopponent ?? 0),
          0
        ) / value1.stats.length,
      value2:
        value2.stats.reduce(
          (acc, value) => acc + (value.twoptsextopponent ?? 0),
          0
        ) / value2.stats.length,
      fixed: 1,
    },
    {
      label: "LFR",
      value1: lfR1,
      value2: lfR2,
      fixed: 1,
    },
    {
      label: "LFT",
      value1: lfT1,
      value2: lfT2,
      fixed: 1,
    },
    {
      label: "%LF",
      value1: getPourcentageLFNumber(lfR1, lfT1),
      value2: getPourcentageLFNumber(lfR2, lfT2),
      fixed: 1,
    },
    {
      label: "LFR ADV",
      value1: lfRAdv1,
      value2: lfRAdv2,
      fixed: 1,
    },
    {
      label: "LFT ADV",
      value1: lfTAdv1,
      value2: lfTAdv2,
      fixed: 1,
    },
    {
      label: "%LF ADV",
      value1: getPourcentageLFNumber(lfRAdv1, lfTAdv1),
      value2: getPourcentageLFNumber(lfRAdv2, lfTAdv2),
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
              <SelectStatsTeam
                value={value1}
                results={VALUES}
                onSelect={(value) => setValue1(value)}
              />
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={5} sx={{ textAlign: "center" }}>
              <SelectStatsTeam
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
              {datas.map((el) => (
                <Grid item xs={12}>
                  <LineCompareTable value={el} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};
