import { Box, Grid, Typography } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import { percent, px } from "csx";
import { useContext } from "react";
import { PlayerContext } from "src/pages/player/PlayerPage";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const HeaderPlayer = () => {
  const { t } = useTranslation();
  const { teams, player, avg } = useContext(PlayerContext);

  const win = avg.length > 0 ? avg[0].win : undefined;
  const games = avg.length > 0 ? avg[0].games : undefined;
  const points = avg.length > 0 ? avg[0].points : undefined;
  const troisPoints = avg.length > 0 ? avg[0].threeptspassed : undefined;
  const lf = avg.length > 0 ? avg[0].lfpassed : undefined;
  const fautes = avg.length > 0 ? avg[0].fouls : undefined;

  const percentWin =
    win && games
      ? `${((win / games) * 100).toFixed(1)}% (${win}/${games})`
      : "-";

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={4} md={2}>
        <Box
          sx={{
            width: percent(100),
            height: px(150),
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "secondary.main",
            borderRadius: px(15),
          }}
        >
          <PersonIcon sx={{ width: 70, height: 70 }} />
        </Box>
      </Grid>
      {player && (
        <Grid item xs={12} sm={8} md={10}>
          <Grid
            container
            spacing={1}
            direction="column"
            justifyContent="space-between"
          >
            <Grid item xs={12}>
              <Typography variant="h1">{`${player.firstname} ${player.lastname}`}</Typography>
            </Grid>
            {teams.length > 0 && (
              <Grid item xs={12} sx={{ display: "flex", gap: 2 }}>
                <Typography variant="h4">{t("commun.teams")} :</Typography>
                <Typography variant="body1">
                  {teams.map((team) => (
                    <Link to={`/team/${team.id}`} key={team.id}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 500,
                          "&:hover": { color: "secondary.main" },
                        }}
                      >
                        {`${team.name} (${team.abreviation})`}
                      </Typography>
                    </Link>
                  ))}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Grid
                container
                alignItems="center"
                sx={{ textAlign: "center" }}
                columnSpacing={{ xs: 3 }}
              >
                <Grid item>
                  <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
                    {t("commun.win")}
                  </Typography>
                  <Typography variant="body1">{percentWin}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
                    {t("commun.points")}
                  </Typography>
                  <Typography variant="body1">
                    {points ? points.toFixed(1) : "-"}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
                    {t("commun.threepoints")}
                  </Typography>
                  <Typography variant="body1">
                    {troisPoints ? troisPoints.toFixed(1) : "-"}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
                    {t("commun.freethrow")}
                  </Typography>
                  <Typography variant="body1">
                    {lf ? lf.toFixed(1) : "-"}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
                    {t("commun.fouls")}
                  </Typography>
                  <Typography variant="body1">
                    {fautes ? fautes.toFixed(1) : "-"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};
