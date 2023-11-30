import { StatsPlayer, StatsPlayerAvg, StatsTeam } from "src/models/Statistique";
import { Colors } from "src/style/Colors";
import { DonutChart } from "./DonutChart";
import { useTranslation } from "react-i18next";

interface Props {
  stats: Array<StatsTeam>;
}
export const DonutRepartitionFautes = ({ stats }: Props) => {
  const { t } = useTranslation();
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

  return (
    <DonutChart
      dataTotal={dataTotal.filter((el) => el.value !== 0)}
      dataAverage={dataMatch.filter((el) => el.value !== 0)}
      title={t("commun.fouls")}
    />
  );
};

export const DonutRepartitionFautesProvoquees = ({ stats }: Props) => {
  const { t } = useTranslation();
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

  return (
    <DonutChart
      dataTotal={dataTotal.filter((el) => el.value !== 0)}
      dataAverage={dataMatch.filter((el) => el.value !== 0)}
      title={t("commun.provokedfouls")}
    />
  );
};

interface PropsPlayer {
  stats: Array<StatsPlayer>;
}
export const DonutRepartitionFautesPlayer = ({ stats }: PropsPlayer) => {
  const { t } = useTranslation();
  const p = stats.reduce((acc, el) => acc + (el.fouls_0lf ?? 0), 0);
  const p1 = stats.reduce((acc, el) => acc + (el.fouls_1lf ?? 0), 0);
  const p2 = stats.reduce((acc, el) => acc + (el.fouls_2lf ?? 0), 0);
  const p3 = stats.reduce((acc, el) => acc + (el.fouls_3lf ?? 0), 0);
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

  return (
    <DonutChart
      dataTotal={dataTotal.filter((el) => el.value !== 0)}
      dataAverage={dataMatch.filter((el) => el.value !== 0)}
      title={t("commun.fouls")}
    />
  );
};

interface PropsPlayer2 {
  stat: StatsPlayerAvg;
}
export const DonutRepartitionFautesPlayer2 = ({ stat }: PropsPlayer2) => {
  const { t } = useTranslation();
  const games = stat.games ?? 0;
  const p = stat.fouls_0lf ?? 0;
  const p1 = stat.fouls_1lf ?? 0;
  const p2 = stat.fouls_2lf ?? 0;
  const p3 = stat.fouls_3lf ?? 0;
  const dataMatch = [
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

  const dataTotal = [
    {
      name: "0LF",
      value: p * games,
      color: Colors.blue,
    },
    {
      name: "1LF",
      value: p1 * games,
      color: Colors.green,
    },
    {
      name: "2LF",
      value: p2 * games,
      color: Colors.red,
    },
    {
      name: "3LF",
      value: p3 * games,
      color: Colors.yellow,
    },
  ];

  return (
    <DonutChart
      dataTotal={dataTotal.filter((el) => el.value !== 0)}
      dataAverage={dataMatch.filter((el) => el.value !== 0)}
      title={t("commun.fouls")}
    />
  );
};
