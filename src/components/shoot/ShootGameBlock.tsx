import {
  Box,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import { Shoot, TimeShoot } from "src/models/Shoot";

import { Fragment, useState } from "react";
import halfCourtLeft from "src/assets/halfCourtLeft.png";
import halfCourtRight from "src/assets/halfCourtRight.png";
import { ShootHeaderQTBlock } from "./ShootHeaderQTBlock";
import { ShootPoint } from "./ShootPoint";
import { useTranslation } from "react-i18next";
import { Player } from "src/models/Player";
import { sortByName } from "src/utils/sort";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Game } from "src/models/Game";

interface Props {
  shoots: Array<Shoot>;
  players: Array<Player>;
  game: Game;
}

export const ShootGameBlock = ({ game, shoots, players }: Props) => {
  const { t } = useTranslation();
  const qt = [
    { value: 0, label: t("filter.qt.all") },
    { value: 1, label: t("filter.qt.q1") },
    { value: 2, label: t("filter.qt.q2") },
    { value: 3, label: t("filter.qt.q3") },
    { value: 4, label: t("filter.qt.q4") },
    { value: 5, label: t("filter.qt.p") },
    { value: 6, label: t("filter.qt.1m") },
    { value: 7, label: t("filter.qt.2m") },
  ];

  const playersValue = [
    { value: 0, label: t("filter.player.all") },
    ...players.sort(sortByName).map((el) => ({
      value: el.id,
      label: `${el.firstname} ${el.lastname.toUpperCase()}`,
    })),
  ];

  const [filter, setFilter] = useState({
    qt: 0,
    player: 0,
  });

  const filterQt = (value: Shoot) => {
    let res = true;
    switch (filter.qt) {
      case 0:
        res = true;
        break;
      case 1:
        res = value.time === TimeShoot.q1;
        break;
      case 2:
        res = value.time === TimeShoot.q2;
        break;
      case 3:
        res = value.time === TimeShoot.q3;
        break;
      case 4:
        res = value.time === TimeShoot.q4;
        break;
      case 5:
        res = value.time === TimeShoot.p;
        break;
      case 6:
        res = value.time === TimeShoot.q1 || value.time === TimeShoot.q2;
        break;
      case 7:
        res = value.time === TimeShoot.q3 || value.time === TimeShoot.q4;
        break;
    }
    return res;
  };

  const filterPlayer = (value: Shoot) => {
    let res = true;
    if (filter.player !== 0) {
      res = value.player === filter.player;
    }
    return res;
  };

  const shootsTeam = [...shoots]
    .filter((el) => el.team === game.team.id)
    .filter(filterQt)
    .filter(filterPlayer);
  const shootsOpponent = [...shoots]
    .filter((el) => el.team === game.teamopponent.id)
    .filter(filterQt);
  return (
    <Grid container spacing={1}>
      <Grid
        item
        xs={12}
        sx={{
          justifyContent: "center",
          display: "flex",
        }}
      >
        <ShootHeaderQTBlock />
      </Grid>
      <Grid item xs={12} sx={{ display: "flex" }}>
        <Box
          sx={{
            position: "relative",
            width: "50%",
          }}
        >
          <img src={halfCourtLeft} width="100%" />
          {shootsTeam.map((shoot, index) => (
            <Fragment key={index}>
              <ShootPoint shoot={shoot} rotate="left" />
            </Fragment>
          ))}
        </Box>
        <Box
          sx={{
            position: "relative",
            width: "50%",
          }}
        >
          <img src={halfCourtRight} width="100%" />
          {shootsOpponent.map((shoot, index) => (
            <Fragment key={index}>
              <ShootPoint shoot={shoot} rotate="right" />
            </Fragment>
          ))}
        </Box>
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <FilterAltIcon fontSize="large" />
        <Typography variant="h2">{t("commun.filter")}</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          value={filter.player.toString()}
          onChange={(event: SelectChangeEvent) =>
            setFilter((prev) => ({
              ...prev,
              player: Number(event.target.value),
            }))
          }
          size="small"
          fullWidth
          displayEmpty
        >
          {playersValue.map((item) => (
            <MenuItem value={item.value}>{item.label}</MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          value={filter.qt.toString()}
          onChange={(event: SelectChangeEvent) =>
            setFilter((prev) => ({
              ...prev,
              qt: Number(event.target.value),
            }))
          }
          size="small"
          fullWidth
          displayEmpty
        >
          {qt.map((item) => (
            <MenuItem value={item.value}>{item.label}</MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
};
