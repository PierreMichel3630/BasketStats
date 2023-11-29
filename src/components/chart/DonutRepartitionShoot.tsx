import { StatsPlayer } from "src/models/Statistique";
import { Colors } from "src/style/Colors";
import { DonutChart } from "./DonutChart";
import { useTranslation } from "react-i18next";

interface PropsPlayer {
  stats: Array<StatsPlayer>;
  type: string;
}
export const DonutRepartitionShootPlayer = ({ type, stats }: PropsPlayer) => {
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

  const data = type === "tot" ? dataTotal : dataMatch;

  return (
    <DonutChart
      data={data.filter((el) => el.value !== 0)}
      title={t("commun.shootdistribution")}
    />
  );
};
