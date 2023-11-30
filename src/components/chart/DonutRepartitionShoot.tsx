import { StatsPlayer, StatsPlayerAvg } from "src/models/Statistique";
import { Colors } from "src/style/Colors";
import { DonutChart } from "./DonutChart";
import { useTranslation } from "react-i18next";

interface PropsPlayer {
  stats: Array<StatsPlayer>;
}
export const DonutRepartitionShootPlayer = ({ stats }: PropsPlayer) => {
  const { t } = useTranslation();
  const troisPoints = stats.reduce(
    (acc, el) => acc + (el.threeptspassed ?? 0),
    0
  );
  const lfs = stats.reduce((acc, el) => acc + (el.lfpassed ?? 0), 0);
  const deuxPtsExtTeam = stats.reduce(
    (acc, el) => acc + (el.twoptsextpassed ?? 0),
    0
  );
  const deuxPtsIntTeam = stats.reduce(
    (acc, el) => acc + (el.twoptsintpassed ?? 0),
    0
  );
  const dataMatch = [
    {
      name: "LFs",
      value: lfs / stats.length,
      color: Colors.blue,
    },
    {
      name: "2Pts Int.",
      value: deuxPtsIntTeam / stats.length,
      color: Colors.green,
    },
    {
      name: "2Pts Ext.",
      value: deuxPtsExtTeam / stats.length,
      color: Colors.red,
    },
    {
      name: "3Pts",
      value: troisPoints / stats.length,
      color: Colors.yellow,
    },
  ];

  const dataTotal = [
    {
      name: "LFs",
      value: lfs,
      color: Colors.blue,
    },
    {
      name: "2Pts Int.",
      value: deuxPtsIntTeam,
      color: Colors.green,
    },
    {
      name: "2Pts Ext.",
      value: deuxPtsExtTeam,
      color: Colors.red,
    },
    {
      name: "3Pts",
      value: troisPoints,
      color: Colors.yellow,
    },
  ];

  return (
    <DonutChart
      dataTotal={dataTotal.filter((el) => el.value !== 0)}
      dataAverage={dataMatch.filter((el) => el.value !== 0)}
      title={t("commun.shootdistribution")}
    />
  );
};

interface PropsPlayer2 {
  stat: StatsPlayerAvg;
}
export const DonutRepartitionShootPlayer2 = ({ stat }: PropsPlayer2) => {
  const { t } = useTranslation();
  const games = stat.games ?? 0;
  const troisPoints = (stat.threeptspassed ?? 0) * 3;
  const lfs = (stat.lfpassed ?? 0) * 1;
  const deuxPtsExtTeam = (stat.twoptsextpassed ?? 0) * 2;
  const deuxPtsIntTeam = (stat.twoptsintpassed ?? 0) * 2;
  const dataMatch = [
    {
      name: "LFs",
      value: lfs,
      color: Colors.blue,
    },
    {
      name: "2Pts Int.",
      value: deuxPtsIntTeam,
      color: Colors.green,
    },
    {
      name: "2Pts Ext.",
      value: deuxPtsExtTeam,
      color: Colors.red,
    },
    {
      name: "3Pts",
      value: troisPoints,
      color: Colors.yellow,
    },
  ];

  const dataTotal = [
    {
      name: "LFs",
      value: lfs * games,
      color: Colors.blue,
    },
    {
      name: "2Pts Int.",
      value: deuxPtsIntTeam * games,
      color: Colors.green,
    },
    {
      name: "2Pts Ext.",
      value: deuxPtsExtTeam * games,
      color: Colors.red,
    },
    {
      name: "3Pts",
      value: troisPoints * games,
      color: Colors.yellow,
    },
  ];

  return (
    <DonutChart
      dataTotal={dataTotal.filter((el) => el.value !== 0)}
      dataAverage={dataMatch.filter((el) => el.value !== 0)}
      title={t("commun.shootdistribution")}
    />
  );
};
