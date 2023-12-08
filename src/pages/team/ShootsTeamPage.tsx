import {
  Box,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Fragment, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { ShootHeaderQTBlock } from "src/components/shoot/ShootHeaderQTBlock";
import { ShootPoint } from "src/components/shoot/ShootPoint";
import { TeamContext } from "./TeamPage";

import { Shoot, TimeShoot } from "src/models/Shoot";
import { sortByDateAsc, sortByName } from "src/utils/sort";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import moment from "moment";
import halfCourtLeft from "src/assets/halfCourtLeft.png";
import halfCourtRight from "src/assets/halfCourtRight.png";

export const ShootsTeamPage = () => {
  const { shoots, players, games, team } = useContext(TeamContext);
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
  const gamesValue = [
    { value: 0, label: t("filter.game.all") },
    ...games.sort(sortByDateAsc).map((el) => ({
      value: el.id,
      label: `${moment(el.date).format("DD/MM/YY")} - ${el.teamopponent.name}`,
    })),
  ];

  const [filter, setFilter] = useState({
    qt: 0,
    player: 0,
    game: 0,
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

  const filterGame = (value: Shoot) => {
    let res = true;
    if (filter.game !== 0) {
      res = value.game === filter.game;
    }
    return res;
  };

  const shootsFilter = [...shoots]
    .filter((el) => team && el.team === team.id)
    .filter(filterQt)
    .filter(filterPlayer)
    .filter(filterGame);

  const shootsOpponentFilter = [...shoots]
    .filter((el) => team && el.team !== team.id)
    .filter(filterQt)
    .filter(filterGame);

  return (
    <Grid container spacing={1} justifyContent="center">
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
          fullWidth
          size="small"
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
          fullWidth
          size="small"
          displayEmpty
        >
          {qt.map((item) => (
            <MenuItem value={item.value}>{item.label}</MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={12}>
        <Select
          value={filter.game.toString()}
          onChange={(event: SelectChangeEvent) =>
            setFilter((prev) => ({
              ...prev,
              game: Number(event.target.value),
            }))
          }
          fullWidth
          size="small"
          displayEmpty
        >
          {gamesValue.map((item) => (
            <MenuItem value={item.value}>{item.label}</MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          textAlign: "center",
        }}
      >
        <Typography variant="h2">{team?.name}</Typography>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          textAlign: "center",
        }}
      >
        <Typography variant="h2">{t("commun.opponent")}</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "50%",
          }}
        >
          <img src={halfCourtLeft} width="100%" />
          {shootsFilter.map((shoot, index) => (
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
          {shootsOpponentFilter.map((shoot, index) => (
            <Fragment key={index}>
              <ShootPoint shoot={shoot} rotate="right" />
            </Fragment>
          ))}
        </Box>
      </Grid>
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
    </Grid>
  );
};
