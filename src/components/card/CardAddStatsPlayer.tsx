import {
  Alert,
  Box,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { padding, percent, px } from "csx";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Player } from "src/models/Player";

import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteShootById, insertShoot } from "src/api/shoot";
import court from "src/assets/halfCourt.png";
import { Game } from "src/models/Game";
import { Shoot, ShootInsert } from "src/models/Shoot";
import { StatsPlayer } from "src/models/Statistique";
import { Colors } from "src/style/Colors";
import {
  getColorShoot,
  getFouls,
  getLfPlayer,
  getPointsPlayer,
  getThreePointsPlayer,
  getTimeShoot,
  getTwoPointsExtPlayer,
  getTwoPointsIntPlayer,
  getTypeShoot,
} from "src/utils/calcul";

interface Props {
  player: Player;
  stat: StatsPlayer;
  game: Game;
  shoots: Array<Shoot>;
  addShoot: (value: Shoot) => void;
  deleteShoot: (id: number) => void;
}

export const CardAddStatsPlayer = ({
  shoots,
  game,
  stat,
  player,
  addShoot,
  deleteShoot,
}: Props) => {
  const { t } = useTranslation();

  const [time, setTime] = useState(1);

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
      player: player.id,
      game: game.id,
      team: game.team.id,
    };
    const { data } = await insertShoot(shoot);
    if (data) {
      addShoot(data as Shoot);
    }
  };

  const onClickDeleteShoot = async (id: number) => {
    const { error } = await deleteShootById(id);
    if (!error) {
      deleteShoot(id);
    }
  };

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
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h2">
            {player.firstname} {player.lastname.toUpperCase()}
          </Typography>
          <Typography variant="h2">
            {t("commun.numberabbreviation")} {stat.number}
          </Typography>
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
                        onClick={() => onClickDeleteShoot(shoot.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Paper>
                  ))
                ) : (
                  <Alert severity="warning">Aucun Shoot renseigné</Alert>
                )}
              </Grid>
            </Grid>
          </Box>
        </Grid>
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
                  value={getPointsPlayer(stat)}
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
                  value={getThreePointsPlayer(stat)}
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
                  value={getTwoPointsExtPlayer(stat)}
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
                  value={getTwoPointsIntPlayer(stat)}
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
                  value={getLfPlayer(stat)}
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
                  value={getFouls(stat)}
                  disabled
                  sx={{ width: 50 }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};
