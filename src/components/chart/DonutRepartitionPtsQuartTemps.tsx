import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import { StatsTeam } from "src/models/Statistique";
import { Colors } from "src/style/Colors";
import { DonutChart } from "./DonutChart";

interface Props {
  stats: Array<StatsTeam>;
}
export const DonutRepartitionPtsQuartTempsMarques = ({ stats }: Props) => {
  const [type, setType] = useState("tot");

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

export const DonutRepartitionPtsQuartTempsEncaisses = ({ stats }: Props) => {
  const [type, setType] = useState("tot");

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
