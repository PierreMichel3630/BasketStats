import {
  Box,
  Grid,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { padding, px } from "csx";
import moment from "moment";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { ToogleButtonCard } from "src/components/ToogleButton";
import { ShootHalfCourtBlock } from "src/components/shoot/ShootHalfCourtBlock";
import { ShootHeaderQTBlock } from "src/components/shoot/ShootHeaderQTBlock";
import { Shoot, TimeShoot } from "src/models/Shoot";
import { sortByDateAsc } from "src/utils/sort";
import { PlayerContext } from "./PlayerPage";

export const ShootsPlayerPage = () => {
  const { shoots, games } = useContext(PlayerContext);
  const { t } = useTranslation();
  const [type, setType] = useState("all");
  const types = [
    { label: t("commun.all"), value: "all" },
    { label: t("commun.shoots"), value: "shoot" },
    { label: t("commun.zone"), value: "zone" },
  ];
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

  const gamesValue = [
    { value: 0, label: t("filter.game.all") },
    ...games
      .map((el) => el.game)
      .sort(sortByDateAsc)
      .map((el) => ({
        value: el.id,
        label: `${moment(el.date).format("DD/MM/YY")} - ${
          el.teamopponent.name
        }`,
      })),
  ];

  const [filter, setFilter] = useState({
    qt: 0,
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

  const filterGame = (value: Shoot) => {
    let res = true;
    if (filter.game !== 0) {
      res = value.game === filter.game;
    }
    return res;
  };

  const shootsFilter = [...shoots].filter(filterQt).filter(filterGame);

  return (
    <Paper
      variant="outlined"
      sx={{ width: "100%", bgcolor: "background.paper" }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            bgcolor: "primary.main",
            p: padding(px(2), px(8)),
            mb: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4" color="white" textTransform="uppercase">
            {t("commun.shootposition")}
          </Typography>
          <ToogleButtonCard
            select={type}
            onChange={(value) => setType(value)}
            values={types}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ p: 1 }}>
            <Grid container spacing={1} justifyContent="center">
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
              <Grid item xs={12} sm={6}>
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
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ShootHalfCourtBlock shoots={shootsFilter} type={type} />
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
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
