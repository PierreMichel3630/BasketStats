import {
  Alert,
  Box,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { padding, percent, px } from "csx";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteShootById,
  getShootByGameAndTeam,
  insertShoot,
} from "src/api/shoot";
import { updateStatsTeam } from "src/api/statistique";
import court from "src/assets/halfCourt.png";
import { Game } from "src/models/Game";
import { Shoot, ShootInsert, TimeShoot, TypeShoot } from "src/models/Shoot";
import { StatsTeam } from "src/models/Statistique";
import { Colors } from "src/style/Colors";
import { getColorShoot, getTimeShoot, getTypeShoot } from "src/utils/calcul";
import { AddFoulsBlockOpponentV2 } from "../statistique/AddFoulsBlock";
import { AddLfBlock } from "../statistique/AddLfBlock";

interface Props {
  game: Game;
  stats: StatsTeam;

  setStatsTeam: (stats: StatsTeam) => void;
}

export interface StatsTeamAdd {
  id: number;
  team: number;
  game: number;
  q1opponent: null | number;
  q2opponent: null | number;
  q3opponent: null | number;
  q4opponent: null | number;
  q1team: null | number;
  q2team: null | number;
  q3team: null | number;
  q4team: null | number;
  foul0lfopponent: null | number;
  foul1lfopponent: null | number;
  foul2lfopponent: null | number;
  foul3lfopponent: null | number;
  foul0lfteam: null | number;
  foul1lfteam: null | number;
  foul2lfteam: null | number;
  foul3lfteam: null | number;
  threeptsteam: null | number;
  twoptsextteam: null | number;
  twoptsintteam: null | number;
  lfq1team: null | number;
  lfq2team: null | number;
  lfq3team: null | number;
  lfq4team: null | number;
  lfpteam: null | number;
  threeptsopponent: null | number;
  twoptsextopponent: null | number;
  twoptsintopponent: null | number;
  lfq1opponent: null | number;
  lfq2opponent: null | number;
  lfq3opponent: null | number;
  lfq4opponent: null | number;
  lfpopponent: null | number;
}

export const CardAddStatsOpponent = ({ game, stats, setStatsTeam }: Props) => {
  const { t } = useTranslation();

  const [time, setTime] = useState(1);
  const [shoots, setShoots] = useState<Array<Shoot>>([]);
  const [statsUpdate, setStatsUpdate] = useState<StatsTeamAdd>({
    ...stats,
    game: game.id,
    team: game.team.id,
  });

  const onClickCourt = async (event: React.MouseEvent<HTMLDivElement>) => {
    var dim = event.currentTarget.getBoundingClientRect();
    const xSize = dim.right - dim.left;
    var x = event.clientX - dim.left;
    const ySize = dim.bottom - dim.top;
    var y = event.clientY - dim.top;

    const xPercent = (x * 100) / xSize;
    const yPercent = (y * 100) / ySize;
    const shoot: ShootInsert = {
      x: xPercent,
      y: yPercent,
      type: getTypeShoot(xPercent, yPercent),
      time: getTimeShoot(time),
      team: game.teamopponent.id,
      game: game.id,
    };
    const { data } = await insertShoot(shoot);
    if (data) {
      setShoots((prev) => [...prev, data as Shoot]);
    }
  };

  const deleteShoot = async (id: number) => {
    const { error } = await deleteShootById(id);
    if (!error) {
      setShoots([...shoots].filter((el) => el.id !== id));
    }
  };

  const getShoots = () => {
    getShootByGameAndTeam(game.id, game.teamopponent.id).then((res) => {
      setShoots(res.data as Array<Shoot>);
    });
  };

  useEffect(() => {
    getShoots();
  }, [game]);

  const updateStats = async () => {
    if (statsUpdate) {
      const { data } = await updateStatsTeam(statsUpdate);
      setStatsTeam(data as StatsTeam);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      updateStats();
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [statsUpdate]);

  const onChange = (field: string, value: number) => {
    setStatsUpdate((prev) => {
      if (prev !== null) {
        return { ...prev, [field]: value };
      }
      return prev;
    });
  };

  const calculStat = () => {
    const threepts = shoots.filter(
      (el) => el.type === TypeShoot.threepts
    ).length;
    const twoptsext = shoots.filter(
      (el) => el.type === TypeShoot.twoptsext
    ).length;
    const twoptsint = shoots.filter(
      (el) => el.type === TypeShoot.twoptsint
    ).length;
    const q1 =
      shoots
        .filter((el) => el.time === TimeShoot.q1)
        .reduce(
          (acc, value) => acc + (value.type === TypeShoot.threepts ? 3 : 2),
          0
        ) + (stats ? stats.lfq1opponent ?? 0 : 0);
    const q2 =
      shoots
        .filter((el) => el.time === TimeShoot.q2)
        .reduce(
          (acc, value) => acc + (value.type === TypeShoot.threepts ? 3 : 2),
          0
        ) + (stats ? stats.lfq2opponent ?? 0 : 0);
    const q3 =
      shoots
        .filter((el) => el.time === TimeShoot.q3)
        .reduce(
          (acc, value) => acc + (value.type === TypeShoot.threepts ? 3 : 2),
          0
        ) + (stats ? stats.lfq3opponent ?? 0 : 0);
    const q4 =
      shoots
        .filter((el) => el.time === TimeShoot.q4)
        .reduce(
          (acc, value) => acc + (value.type === TypeShoot.threepts ? 3 : 2),
          0
        ) + (stats ? stats.lfq4opponent ?? 0 : 0);

    setStatsUpdate((prev) => {
      if (prev !== null) {
        return {
          ...prev,
          q1opponent: q1,
          q2opponent: q2,
          q3opponent: q3,
          q4opponent: q4,
          threeptsopponent: threepts,
          twoptsintopponent: twoptsint,
          twoptsextopponent: twoptsext,
        };
      }
      return prev;
    });
  };

  useEffect(() => {
    calculStat();
  }, [shoots]);

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
            bgcolor: "secondary.main",
            p: padding(px(2), px(8)),
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h2">{game.opponent}</Typography>
        </Grid>
        <Grid item xs={12} sx={{ m: 1 }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
              }}
              onClick={() => setTime(1)}
            >
              <Box
                sx={{ bgcolor: Colors.red, width: px(10), height: px(10) }}
              />
              <Typography variant="h6" sx={{ color: Colors.red }}>
                {t("commun.quartertime1")}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
              }}
              onClick={() => setTime(2)}
            >
              <Box
                sx={{
                  bgcolor: Colors.green,
                  width: px(10),
                  height: px(10),
                }}
              />
              <Typography variant="h6" sx={{ color: Colors.green }}>
                {t("commun.quartertime2")}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
              }}
              onClick={() => setTime(3)}
            >
              <Box
                sx={{ bgcolor: Colors.blue, width: px(10), height: px(10) }}
              />
              <Typography variant="h6" sx={{ color: Colors.blue }}>
                {t("commun.quartertime3")}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
              }}
              onClick={() => setTime(4)}
            >
              <Box
                sx={{
                  bgcolor: Colors.orange,
                  width: px(10),
                  height: px(10),
                }}
              />
              <Typography variant="h6" sx={{ color: Colors.orange }}>
                {t("commun.quartertime4")}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
              }}
              onClick={() => setTime(5)}
            >
              <Box
                sx={{
                  bgcolor: Colors.yellow,
                  width: px(10),
                  height: px(10),
                }}
              />
              <Typography variant="h6" sx={{ color: Colors.yellow }}>
                {t("commun.prolongation")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid item xs={12}>
            <Box onClick={onClickCourt} sx={{ position: "relative" }}>
              <img src={court} width="100%" />
              {shoots.map((shoot, index) => (
                <ClearIcon
                  key={index}
                  sx={{
                    position: "absolute",
                    fontSize: px(30),
                    top: percent(shoot.y),
                    left: percent(shoot.x),
                    transform: "translate(-50%, -50%)",
                    color: getColorShoot(shoot.time),
                  }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={12}>
                <Typography variant="h2">{t("commun.shoots")}</Typography>
              </Grid>
              <Grid item xs={12} sx={{ maxHeight: px(200), overflowY: "auto" }}>
                {shoots.length > 0 ? (
                  shoots.map((shoot, index) => (
                    <Paper
                      variant="outlined"
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        m: 1,
                        p: px(3),
                      }}
                      key={index}
                    >
                      <Typography variant="h6">Shoot {index + 1}</Typography>
                      <Typography variant="body1">
                        {t(`enum.TypeShoot.${shoot.type}`)}
                      </Typography>
                      <Typography variant="body1">
                        {t(`enum.TimeShoot.${shoot.time}`)}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => deleteShoot(shoot.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Paper>
                  ))
                ) : (
                  <Alert severity="warning">Aucun Shoot renseigné</Alert>
                )}
              </Grid>
              {stats && (
                <>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h2">{t("commun.fouls")}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <AddFoulsBlockOpponentV2
                      stats={statsUpdate}
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h2">{t("commun.lf")}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <AddLfBlock stats={statsUpdate} onChange={onChange} />
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        </Grid>
        {stats && (
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 1, m: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <Typography variant="h4">{t("commun.resume")}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">{t("commun.points")}</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    size="small"
                    value={
                      (stats.twoptsextopponent ?? 0) * 2 +
                      (stats.twoptsintopponent ?? 0) * 2 +
                      (stats.threeptsopponent ?? 0) * 3 +
                      ((stats.lfq1opponent ?? 0) +
                        (stats.lfq2opponent ?? 0) +
                        (stats.lfq3opponent ?? 0) +
                        (stats.lfq4opponent ?? 0) +
                        (stats.lfpopponent ?? 0)) *
                        1
                    }
                    disabled
                    sx={{ width: 50 }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h6">{t("commun.threepts")}</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    size="small"
                    value={stats.threeptsopponent ?? 0}
                    disabled
                    sx={{ width: 50 }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h6">{t("commun.twoptsext")}</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    size="small"
                    value={stats.twoptsextopponent ?? 0}
                    disabled
                    sx={{ width: 50 }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h6">{t("commun.twoptsint")}</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    size="small"
                    value={stats.twoptsintopponent ?? 0}
                    disabled
                    sx={{ width: 50 }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h6">{t("commun.lf")}</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    size="small"
                    value={
                      (stats.lfq1opponent ?? 0) +
                      (stats.lfq2opponent ?? 0) +
                      (stats.lfq3opponent ?? 0) +
                      (stats.lfq4opponent ?? 0) +
                      (stats.lfpopponent ?? 0)
                    }
                    disabled
                    sx={{ width: 50 }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h6">{t("commun.fouls")}</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    size="small"
                    value={
                      (stats.foul0lfopponent ?? 0) +
                      (stats.foul1lfopponent ?? 0) +
                      (stats.foul2lfopponent ?? 0) +
                      (stats.foul3lfopponent ?? 0)
                    }
                    disabled
                    sx={{ width: 50 }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};
