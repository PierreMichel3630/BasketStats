import { useTranslation } from "react-i18next";
import { StatsPlayer, StatsPlayerAvg, StatsTeam } from "src/models/Statistique";
import { Colors } from "src/style/Colors";
import { DonutChart } from "./DonutChart";
import {
  getThreePointsPlayer,
  getTwoPointsExtPlayer,
  getTwoPointsIntPlayer,
} from "src/utils/calcul";

interface Props {
  stats: Array<StatsTeam>;
}
export const DonutRepartitionPtsMarques = ({ stats }: Props) => {
  const { t } = useTranslation();
  const troisPoints = stats.reduce(
    (acc, el) => acc + (el.threeptsteam ?? 0) * 3,
    0
  );
  const lfs = stats.reduce((acc, el) => acc + (el.lfteam ?? 0) * 1, 0);
  const deuxPtsExtTeam = stats.reduce(
    (acc, el) => acc + (el.twoptsextteam ?? 0) * 2,
    0
  );
  const deuxPtsIntTeam = stats.reduce(
    (acc, el) => acc + (el.twoptsintteam ?? 0) * 2,
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
      title={t("commun.scoredpointsdistribution")}
    />
  );
};

export const DonutRepartitionPtsEncaisses = ({ stats }: Props) => {
  const { t } = useTranslation();
  const troisPoints = stats.reduce(
    (acc, el) => acc + (el.threeptsopponent ?? 0) * 3,
    0
  );
  const lfs = stats.reduce((acc, el) => acc + (el.lfopponent ?? 0) * 1, 0);
  const deuxPtsExtTeam = stats.reduce(
    (acc, el) => acc + (el.twoptsextopponent ?? 0) * 2,
    0
  );
  const deuxPtsIntTeam = stats.reduce(
    (acc, el) => acc + (el.twoptsintopponent ?? 0) * 2,
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
      title={t("commun.concededpointsdistribution")}
    />
  );
};

interface PropsPlayer {
  stats: Array<StatsPlayer>;
}
export const DonutRepartitionPtsMarquesPlayer = ({ stats }: PropsPlayer) => {
  const { t } = useTranslation();
  const troisPoints = stats.reduce(
    (acc, el) => acc + getThreePointsPlayer(el) * 3,
    0
  );
  const lfs = stats.reduce((acc, el) => acc + (el.lfpassed ?? 0) * 1, 0);
  const deuxPtsExtTeam = stats.reduce(
    (acc, el) => acc + getTwoPointsExtPlayer(el) * 2,
    0
  );
  const deuxPtsIntTeam = stats.reduce(
    (acc, el) => acc + getTwoPointsIntPlayer(el) * 2,
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
      title={t("commun.scoredpointsdistribution")}
    />
  );
};

interface PropsPlayerAvg {
  stat: StatsPlayerAvg;
}
export const DonutRepartitionPtsMarquesPlayer2 = ({ stat }: PropsPlayerAvg) => {
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
      title={t("commun.scoredpointsdistribution")}
    />
  );
};
