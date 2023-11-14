import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import { StatsTeam } from "src/models/Statistique";
import { Colors } from "src/style/Colors";
import { DonutChart } from "./DonutChart";

interface Props {
  stats: Array<StatsTeam>;
}
export const DonutRepartitionPtsMarques = ({ stats }: Props) => {
  const [type, setType] = useState("tot");

  const troisPoints = stats.reduce(
    (acc, el) => acc + (el["3ptsteam"] ?? 0) * 3,
    0
  );
  const lfs = stats.reduce((acc, el) => acc + (el.lfteam ?? 0) * 1, 0);
  const deuxPtsExtTeam = stats.reduce(
    (acc, el) => acc + (el["2ptsextteam"] ?? 0) * 2,
    0
  );
  const deuxPtsIntTeam = stats.reduce(
    (acc, el) => acc + (el["2ptsintteam"] ?? 0) * 2,
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

  const handleChange = (_: React.MouseEvent<HTMLElement>, newValue: string) => {
    setType(newValue);
  };

  const data = type === "tot" ? dataTotal : dataMatch;

  return (
    <DonutChart
      data={data.filter((el) => el.value !== 0)}
      title="Répartition Points Marqués"
      buttons={
        <ToggleButtonGroup
          color="secondary"
          value={type}
          exclusive
          onChange={handleChange}
          size="small"
        >
          <ToggleButton value="tot">Total</ToggleButton>
          <ToggleButton value="match">Par Match</ToggleButton>
        </ToggleButtonGroup>
      }
    />
  );
};

export const DonutRepartitionPtsEncaisses = ({ stats }: Props) => {
  const [type, setType] = useState("tot");

  const troisPoints = stats.reduce(
    (acc, el) => acc + (el["3ptsopponent"] ?? 0) * 3,
    0
  );
  const lfs = stats.reduce((acc, el) => acc + (el.lfopponent ?? 0) * 1, 0);
  const deuxPtsExtTeam = stats.reduce(
    (acc, el) => acc + (el["2ptsextopponent"] ?? 0) * 2,
    0
  );
  const deuxPtsIntTeam = stats.reduce(
    (acc, el) => acc + (el["2ptsintopponent"] ?? 0) * 2,
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

  const handleChange = (_: React.MouseEvent<HTMLElement>, newValue: string) => {
    setType(newValue);
  };

  const data = type === "tot" ? dataTotal : dataMatch;

  return (
    <DonutChart
      data={data.filter((el) => el.value !== 0)}
      title="Répartition Points Encaissés"
      buttons={
        <ToggleButtonGroup
          color="secondary"
          value={type}
          exclusive
          onChange={handleChange}
          size="small"
        >
          <ToggleButton value="tot">Total</ToggleButton>
          <ToggleButton value="match">Par Match</ToggleButton>
        </ToggleButtonGroup>
      }
    />
  );
};
