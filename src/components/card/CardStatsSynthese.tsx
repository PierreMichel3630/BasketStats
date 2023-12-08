import { Divider, Grid, Paper, Typography } from "@mui/material";
import { padding, px } from "csx";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

import { AddStatsContext } from "src/pages/PageAddStatsGameV3";
import { getPoints, getPointsOpponent } from "src/utils/calcul";

export const CardStatsSynthese = () => {
  const { t } = useTranslation();
  const { game, statsTeam } = useContext(AddStatsContext);

  return (
    game && (
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
            <Typography variant="h2">{t("commun.synthese")}</Typography>
          </Grid>
          <Grid item xs={12} sx={{ m: 1 }}>
            <Grid
              container
              spacing={1}
              justifyContent="center"
              alignItems="center"
              alignContent="center"
              sx={{ textAlign: "center" }}
            >
              <Grid item xs={5}>
                <Typography variant="h2">{game.team.name}</Typography>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={5}>
                <Typography variant="h2">{game.opponent}</Typography>
              </Grid>
              {statsTeam && (
                <>
                  <Grid item xs={5}>
                    <Typography variant="h2">{getPoints(statsTeam)}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h2">{t("commun.score")}</Typography>
                  </Grid>
                  <Grid item xs={5} sx={{ textAlign: "center" }}>
                    <Typography variant="h2">
                      {getPointsOpponent(statsTeam)}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h4">
                      {statsTeam.q1team ?? 0}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h6">
                      {t("commun.quartertime1")}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h4">
                      {statsTeam.q1opponent ?? 0}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h4">
                      {statsTeam.q2team ?? 0}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h6">
                      {t("commun.quartertime2")}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h4">
                      {statsTeam.q2opponent ?? 0}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h4">
                      {statsTeam.q3team ?? 0}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h6">
                      {t("commun.quartertime3")}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h4">
                      {statsTeam.q3opponent ?? 0}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h4">
                      {statsTeam.q4team ?? 0}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h6">
                      {t("commun.quartertime4")}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h4">
                      {statsTeam.q4opponent ?? 0}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h2">{t("commun.shoots")}</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h4">
                      {statsTeam.threeptsteam ?? 0}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h6">{t("commun.threepts")}</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h4">
                      {statsTeam.threeptsopponent ?? 0}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h4">
                      {statsTeam.twoptsintteam ?? 0}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h6">
                      {t("commun.twoptsint")}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h4">
                      {statsTeam.twoptsintopponent ?? 0}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h4">
                      {statsTeam.twoptsextteam ?? 0}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h6">
                      {t("commun.twoptsext")}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h4">
                      {statsTeam.twoptsextopponent ?? 0}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h4">
                      {statsTeam.lfteam ?? 0}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h6">{t("commun.lf")}</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h4">
                      {(statsTeam.lfq1opponent ?? 0) +
                        (statsTeam.lfq2opponent ?? 0) +
                        (statsTeam.lfq3opponent ?? 0) +
                        (statsTeam.lfq4opponent ?? 0) +
                        (statsTeam.lfpopponent ?? 0)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h2">
                      {(statsTeam.foul0lfteam ?? 0) +
                        (statsTeam.foul1lfteam ?? 0) +
                        (statsTeam.foul2lfteam ?? 0) +
                        (statsTeam.foul3lfteam ?? 0)}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h2">{t("commun.fouls")}</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h2">
                      {(statsTeam.foul0lfopponent ?? 0) +
                        (statsTeam.foul1lfopponent ?? 0) +
                        (statsTeam.foul2lfopponent ?? 0) +
                        (statsTeam.foul3lfopponent ?? 0)}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h4">
                      {statsTeam.foul0lfteam ?? 0}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h6">{t("commun.fouls0lf")}</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h4">
                      {statsTeam.foul0lfopponent ?? 0}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h4">
                      {statsTeam.foul1lfteam ?? 0}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h6">{t("commun.fouls1lf")}</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h4">
                      {statsTeam.foul1lfopponent ?? 0}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h4">
                      {statsTeam.foul2lfteam ?? 0}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h6">{t("commun.fouls2lf")}</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h4">
                      {statsTeam.foul2lfopponent ?? 0}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h4">
                      {statsTeam.foul3lfteam ?? 0}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h6">{t("commun.fouls3lf")}</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h4">
                      {statsTeam.foul3lfopponent ?? 0}
                    </Typography>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    )
  );
};
