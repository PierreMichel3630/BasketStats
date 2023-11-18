import { StatsTeam } from "src/models/Statistique";
import { Colors } from "src/style/Colors";
import { DonutChart } from "./DonutChart";

interface Props {
  stats: Array<StatsTeam>;
  type: string;
}
export const DonutRepartitionFautes = ({ type, stats }: Props) => {
  const p = stats.reduce((acc, el) => acc + (el.foul0lfteam ?? 0), 0);
  const p1 = stats.reduce((acc, el) => acc + (el.foul1lfteam ?? 0), 0);
  const p2 = stats.reduce((acc, el) => acc + (el.foul2lfteam ?? 0), 0);
  const p3 = stats.reduce((acc, el) => acc + (el.foul3lfteam ?? 0), 0);
  const dataMatch = [
    {
      name: "0LF",
      value: p / stats.length,
      color: Colors.blue,
    },
    {
      name: "1LF",
      value: p1 / stats.length,
      color: Colors.green,
    },
    {
      name: "2LF",
      value: p2 / stats.length,
      color: Colors.red,
    },
    {
      name: "3LF",
      value: p3 / stats.length,
      color: Colors.yellow,
    },
  ];

  const dataTotal = [
    {
      name: "0LF",
      value: p,
      color: Colors.blue,
    },
    {
      name: "1LF",
      value: p1,
      color: Colors.green,
    },
    {
      name: "2LF",
      value: p2,
      color: Colors.red,
    },
    {
      name: "3LF",
      value: p3,
      color: Colors.yellow,
    },
  ];

  const data = type === "tot" ? dataTotal : dataMatch;

  return (
    <DonutChart data={data.filter((el) => el.value !== 0)} title="Fautes" />
  );
};

export const DonutRepartitionFautesProvoquees = ({ type, stats }: Props) => {
  const p = stats.reduce((acc, el) => acc + (el.foul0lfopponent ?? 0), 0);
  const p1 = stats.reduce((acc, el) => acc + (el.foul1lfopponent ?? 0), 0);
  const p2 = stats.reduce((acc, el) => acc + (el.foul2lfopponent ?? 0), 0);
  const p3 = stats.reduce((acc, el) => acc + (el.foul3lfopponent ?? 0), 0);
  const dataMatch = [
    {
      name: "0LF",
      value: p / stats.length,
      color: Colors.blue,
    },
    {
      name: "1LF",
      value: p1 / stats.length,
      color: Colors.green,
    },
    {
      name: "2LF",
      value: p2 / stats.length,
      color: Colors.red,
    },
    {
      name: "3LF",
      value: p3 / stats.length,
      color: Colors.yellow,
    },
  ];

  const dataTotal = [
    {
      name: "0LF",
      value: p,
      color: Colors.blue,
    },
    {
      name: "1LF",
      value: p1,
      color: Colors.green,
    },
    {
      name: "2LF",
      value: p2,
      color: Colors.red,
    },
    {
      name: "3LF",
      value: p3,
      color: Colors.yellow,
    },
  ];

  const data = type === "tot" ? dataTotal : dataMatch;

  return (
    <DonutChart
      data={data.filter((el) => el.value !== 0)}
      title="Fautes provoquées"
    />
  );
};
