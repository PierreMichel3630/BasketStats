import { StatsTeam } from "src/models/Statistique";
import { Colors } from "src/style/Colors";
import { DonutChart } from "./DonutChart";
import { useTranslation } from "react-i18next";

interface Props {
  stats: Array<StatsTeam>;
  type: string;
}
export const DonutRepartitionPtsQuartTempsMarques = ({
  type,
  stats,
}: Props) => {
  const { t } = useTranslation();
  const q1 = stats.reduce((acc, el) => acc + (el.q1team ?? 0), 0);
  const q2 = stats.reduce((acc, el) => acc + (el.q2team ?? 0), 0);
  const q3 = stats.reduce((acc, el) => acc + (el.q3team ?? 0), 0);
  const q4 = stats.reduce((acc, el) => acc + (el.q4team ?? 0), 0);
  const dataMatch = [
    {
      name: "Q1",
      value: q1 / stats.length,
      color: Colors.blue,
    },
    {
      name: "Q2",
      value: q2 / stats.length,
      color: Colors.green,
    },
    {
      name: "Q3",
      value: q3 / stats.length,
      color: Colors.red,
    },
    {
      name: "Q4",
      value: q4 / stats.length,
      color: Colors.yellow,
    },
  ];

  const dataTotal = [
    {
      name: "Q1",
      value: q1,
      color: Colors.blue,
    },
    {
      name: "Q2",
      value: q2,
      color: Colors.green,
    },
    {
      name: "Q3",
      value: q3,
      color: Colors.red,
    },
    {
      name: "Q4",
      value: q4,
      color: Colors.yellow,
    },
  ];

  const data = type === "tot" ? dataTotal : dataMatch;

  return (
    <DonutChart
      data={data.filter((el) => el.value !== 0)}
      title={t("commun.scoredpointsdistribution")}
    />
  );
};

export const DonutRepartitionPtsQuartTempsEncaisses = ({
  type,
  stats,
}: Props) => {
  const { t } = useTranslation();
  const q1 = stats.reduce((acc, el) => acc + (el.q1opponent ?? 0), 0);
  const q2 = stats.reduce((acc, el) => acc + (el.q2opponent ?? 0), 0);
  const q3 = stats.reduce((acc, el) => acc + (el.q3opponent ?? 0), 0);
  const q4 = stats.reduce((acc, el) => acc + (el.q4opponent ?? 0), 0);
  const dataMatch = [
    {
      name: "Q1",
      value: q1 / stats.length,
      color: Colors.blue,
    },
    {
      name: "Q2",
      value: q2 / stats.length,
      color: Colors.green,
    },
    {
      name: "Q3",
      value: q3 / stats.length,
      color: Colors.red,
    },
    {
      name: "Q4",
      value: q4 / stats.length,
      color: Colors.yellow,
    },
  ];

  const dataTotal = [
    {
      name: "Q1",
      value: q1,
      color: Colors.blue,
    },
    {
      name: "Q2",
      value: q2,
      color: Colors.green,
    },
    {
      name: "Q3",
      value: q3,
      color: Colors.red,
    },
    {
      name: "Q4",
      value: q4,
      color: Colors.yellow,
    },
  ];

  const data = type === "tot" ? dataTotal : dataMatch;

  return (
    <DonutChart
      data={data.filter((el) => el.value !== 0)}
      title={t("commun.concededpointsdistribution")}
    />
  );
};
