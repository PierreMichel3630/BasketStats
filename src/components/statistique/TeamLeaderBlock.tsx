import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { StatsTeam } from "src/models/Statistique";
import { CardStats, CardStatsLF } from "../card/CardStats";
import { getBreakpoint } from "src/utils/mediaQuery";
import { sortByPercent } from "src/utils/sort";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ToogleButtonTotal } from "../ToogleButton";
import { padding, px } from "csx";

interface Props {
  stats: Array<StatsTeam>;
}

export const TeamLeaderBlock = ({ stats }: Props) => {
  const { t } = useTranslation();
  const breakpoint = getBreakpoint();
  const isSmall = breakpoint === "xs";
  const [type, setType] = useState("pergame");
  const isTypeMoy = type === "pergame";

  const ptsMarques = stats.map(
    (value) =>
      (value.q1team ?? 0) +
      (value.q2team ?? 0) +
      (value.q3team ?? 0) +
      (value.q4team ?? 0)
  );
  const ptsMarquesTot = ptsMarques.reduce((acc, value) => acc + value, 0);
  const ptsMarquesMin = Math.min(...ptsMarques);
  const ptsMarquesMax = Math.max(...ptsMarques);

  const ptsEncaisses = stats.map(
    (value) =>
      (value.q1opponent ?? 0) +
      (value.q2opponent ?? 0) +
      (value.q3opponent ?? 0) +
      (value.q4opponent ?? 0)
  );
  const ptsEncaissesTot = ptsEncaisses.reduce((acc, value) => acc + value, 0);
  const ptsEncaissesMin = Math.min(...ptsEncaisses);
  const ptsEncaissesMax = Math.max(...ptsEncaisses);

  const troisptsMarque = stats.map((value) => value.threeptsteam ?? 0);
  const troisptsMarqueTot = troisptsMarque.reduce(
    (acc, value) => acc + value,
    0
  );
  const troisptsMarqueMin = Math.min(...troisptsMarque);
  const troisptsMarqueMax = Math.max(...troisptsMarque);

  const percentLf = stats
    .map((value) => {
      const marque = value.lfteam ?? 0;
      const tente =
        (value.foul1lfopponent ?? 0) +
        (value.foul2lfopponent ? value.foul2lfopponent * 2 : 0) +
        (value.foul3lfopponent ? value.foul3lfopponent * 3 : 0);
      const percent = (marque / tente) * 100;
      return { marque, tente, percent };
    })
    .sort(sortByPercent);
  const percentLfTot = percentLf.reduce(
    (acc, value) => {
      const marque = acc.marque + value.marque;
      const tente = acc.tente + value.tente;
      const percent = (marque / tente) * 100;
      return { marque, tente, percent };
    },
    {
      marque: 0,
      tente: 0,
      percent: 0,
    }
  );

  const minPercentLf =
    percentLf.length > 0 ? percentLf[percentLf.length - 1] : undefined;
  const maxPercentLf = percentLf.length > 0 ? percentLf[0] : undefined;

  return (
    <Paper variant="outlined" sx={{ bgcolor: "background.paper" }}>
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
            {t("commun.teamstatistics")}
          </Typography>
          <ToogleButtonTotal
            value={type}
            onChange={(value) => setType(value)}
          />
        </Grid>
        <Grid item xs={12} sx={{ p: 1 }}>
          <Grid container spacing={1} columns={{ xs: 1, sm: 2, md: 4 }}>
            <Grid item xs={1}>
              <CardStats
                label={t("commun.pointsscored")}
                value={
                  isTypeMoy ? ptsMarquesTot / ptsMarques.length : ptsMarquesTot
                }
                min={isTypeMoy ? ptsMarquesMin : undefined}
                max={isTypeMoy ? ptsMarquesMax : undefined}
              />
            </Grid>
            <Grid item xs={1}>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  flexDirection: isSmall ? "column" : "row",
                }}
              >
                <Divider
                  orientation={isSmall ? "horizontal" : "vertical"}
                  flexItem
                />
                <CardStats
                  label={t("commun.pointsconceded")}
                  value={
                    isTypeMoy
                      ? ptsEncaissesTot / ptsEncaisses.length
                      : ptsEncaissesTot
                  }
                  min={isTypeMoy ? ptsEncaissesMin : undefined}
                  max={isTypeMoy ? ptsEncaissesMax : undefined}
                />
              </Box>
            </Grid>
            <Grid item xs={1}>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  flexDirection: isSmall ? "column" : "row",
                }}
              >
                <Divider
                  orientation={isSmall ? "horizontal" : "vertical"}
                  flexItem
                />
                <CardStats
                  label={t("commun.threepointsscored")}
                  value={
                    isTypeMoy
                      ? troisptsMarqueTot / troisptsMarque.length
                      : troisptsMarqueTot
                  }
                  min={isTypeMoy ? troisptsMarqueMin : undefined}
                  max={isTypeMoy ? troisptsMarqueMax : undefined}
                />
              </Box>
            </Grid>
            <Grid item xs={1}>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  flexDirection: isSmall ? "column" : "row",
                }}
              >
                <Divider
                  orientation={isSmall ? "horizontal" : "vertical"}
                  flexItem
                />
                <CardStatsLF
                  label={t("commun.ftpercent")}
                  value={
                    isTypeMoy
                      ? {
                          marque: percentLfTot.marque / percentLf.length,
                          tente: percentLfTot.tente / percentLf.length,
                          percent:
                            (percentLfTot.marque /
                              percentLf.length /
                              (percentLfTot.tente / percentLf.length)) *
                            100,
                        }
                      : percentLfTot
                  }
                  min={isTypeMoy ? minPercentLf : undefined}
                  max={isTypeMoy ? maxPercentLf : undefined}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
