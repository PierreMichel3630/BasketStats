import { StatsPlayer, StatsTeam } from "src/models/Statistique";
import { Colors } from "src/style/Colors";
import { DonutChart } from "./DonutChart";

interface Props {
  stats: Array<StatsTeam>;
  type: string;
}
export const DonutRepartitionPtsMarques = ({ type, stats }: Props) => {
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

  const data = type === "tot" ? dataTotal : dataMatch;

  return (
    <DonutChart
      data={data.filter((el) => el.value !== 0)}
      title="Répartition Points Marqués"
    />
  );
};

export const DonutRepartitionPtsEncaisses = ({ type, stats }: Props) => {
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

  const data = type === "tot" ? dataTotal : dataMatch;

  return (
    <DonutChart
      data={data.filter((el) => el.value !== 0)}
      title="Répartition Points Encaissés"
    />
  );
};

interface PropsPlayer {
  stats: Array<StatsPlayer>;
  type: string;
}
export const DonutRepartitionPtsMarquesPlayer = ({
  type,
  stats,
}: PropsPlayer) => {
  const troisPoints = stats.reduce(
    (acc, el) => acc + (el.threeptspassed ?? 0) * 3,
    0
  );
  const lfs = stats.reduce((acc, el) => acc + (el.lfpassed ?? 0) * 1, 0);
  const deuxPtsExtTeam = stats.reduce(
    (acc, el) => acc + (el.twoptsextpassed ?? 0) * 2,
    0
  );
  const deuxPtsIntTeam = stats.reduce(
    (acc, el) => acc + (el.twoptsintpassed ?? 0) * 2,
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

  const data = type === "tot" ? dataTotal : dataMatch;

  return (
    <DonutChart
      data={data.filter((el) => el.value !== 0)}
      title="Répartition Points Marqués"
    />
  );
};
