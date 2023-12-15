import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { StatsPlayer, StatsPlayerAvg } from "src/models/Statistique";
import {
  getFouls,
  getLfPlayer,
  getPointsPlayer,
  getThreePointsPlayer,
} from "src/utils/calcul";
import { getBreakpoint } from "src/utils/mediaQuery";
import { CardStats } from "../card/CardStats";

interface Props {
  stat?: StatsPlayerAvg;
  stats: Array<StatsPlayer>;
}

export const PlayerPerformanceBlock = ({ stat, stats }: Props) => {
  const { t } = useTranslation();
  const breakpoint = getBreakpoint();
  const isSmall = breakpoint === "xs";

  const statsFilter = stats.filter((el) => el.is_play);

  const pts = statsFilter.map((el) => getPointsPlayer(el));
  const ptsMin = Math.min(...pts);
  const ptsMax = Math.max(...pts);

  const troispts = statsFilter.map((el) => getThreePointsPlayer(el));
  const troisptsMin = Math.min(...troispts);
  const troisptsMax = Math.max(...troispts);

  const lfs = statsFilter.map((el) => getLfPlayer(el));
  const lfsMin = Math.min(...lfs);
  const lfsMax = Math.max(...lfs);

  const fautes = statsFilter.map((el) => getFouls(el));
  const fautesMin = Math.min(...fautes);
  const fautesMax = Math.max(...fautes);

  return (
    <Paper variant="outlined" sx={{ bgcolor: "background.paper" }}>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            bgcolor: "primary.main",
            p: 1,
            mb: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4" color="white" textTransform="uppercase">
            {t("commun.matchstatistique")}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ p: 1 }}>
          <Grid container spacing={1} columns={{ xs: 1, sm: 2, md: 4 }}>
            <Grid item xs={1}>
              <CardStats
                label={t("commun.points")}
                value={stat ? stat.points ?? 0 : 0}
                min={ptsMin}
                max={ptsMax}
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
                  label={t("commun.threepointsabbreviation")}
                  value={stat ? stat.threeptspassed ?? 0 : 0}
                  min={troisptsMin}
                  max={troisptsMax}
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
                  label={t("commun.ftabbreviation")}
                  value={stat ? stat.lfpassed ?? 0 : 0}
                  min={lfsMin}
                  max={lfsMax}
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
                  label={t("commun.fouls")}
                  value={stat ? stat.fouls ?? 0 : 0}
                  min={fautesMin}
                  max={fautesMax}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
