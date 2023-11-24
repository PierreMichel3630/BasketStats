import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { StatsTeam } from "src/models/Statistique";
import { CardStats, CardStatsLF } from "../card/CardStats";
import { getBreakpoint } from "src/utils/mediaQuery";
import { sortByPercent } from "src/utils/sort";

interface Props {
  stats: Array<StatsTeam>;
  type?: string;
}

export const TeamLeaderBlock = ({ stats, type = "match" }: Props) => {
  const breakpoint = getBreakpoint();
  const isSmall = breakpoint === "xs";

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
        <Grid item xs={12} sx={{ bgcolor: "primary.main", p: 1, mb: 1 }}>
          <Typography variant="h4" color="white">
            TEAM STATISTIQUE
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ p: 1 }}>
          <Grid container spacing={1} columns={{ xs: 1, sm: 2, md: 4 }}>
            <Grid item xs={1}>
              <CardStats
                label="Pts Marqués"
                value={
                  type === "match"
                    ? ptsMarquesTot / ptsMarques.length
                    : ptsMarquesTot
                }
                min={type === "match" ? ptsMarquesMin : undefined}
                max={type === "match" ? ptsMarquesMax : undefined}
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
                  label="Pts Encaissés"
                  value={
                    type === "match"
                      ? ptsEncaissesTot / ptsEncaisses.length
                      : ptsEncaissesTot
                  }
                  min={type === "match" ? ptsEncaissesMin : undefined}
                  max={type === "match" ? ptsEncaissesMax : undefined}
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
                  label="3Pts Marqués"
                  value={
                    type === "match"
                      ? troisptsMarqueTot / troisptsMarque.length
                      : troisptsMarqueTot
                  }
                  min={type === "match" ? troisptsMarqueMin : undefined}
                  max={type === "match" ? troisptsMarqueMax : undefined}
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
                  label="%LF"
                  value={
                    type === "match"
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
                  min={type === "match" ? minPercentLf : undefined}
                  max={type === "match" ? maxPercentLf : undefined}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
