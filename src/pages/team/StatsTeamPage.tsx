import { Alert, Grid } from "@mui/material";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { BarChartLF } from "src/components/chart/BarChart";
import {
  DonutRepartitionFautes,
  DonutRepartitionFautesProvoquees,
} from "src/components/chart/DonutRepartitionFautes";
import {
  DonutRepartitionPtsEncaisses,
  DonutRepartitionPtsMarques,
} from "src/components/chart/DonutRepartitionPts";
import {
  DonutRepartitionPtsQuartTempsEncaisses,
  DonutRepartitionPtsQuartTempsMarques,
} from "src/components/chart/DonutRepartitionPtsQuartTemps";
import { TeamLeaderBlock } from "src/components/statistique/TeamLeaderBlock";
import { TeamContext } from "./TeamPage";

export const StatsTeamPage = () => {
  const { statsTeam } = useContext(TeamContext);
  const { t } = useTranslation();

  return (
    <Grid container spacing={1} justifyContent="center">
      {statsTeam.length > 0 ? (
        <>
          <Grid item xs={12}>
            <TeamLeaderBlock stats={statsTeam} />
          </Grid>
          <Grid item xs={12} md={6}>
            <DonutRepartitionPtsMarques stats={statsTeam} />
          </Grid>
          <Grid item xs={12} md={6}>
            <DonutRepartitionPtsEncaisses stats={statsTeam} />
          </Grid>
          <Grid item xs={12} md={6}>
            <DonutRepartitionPtsQuartTempsMarques stats={statsTeam} />
          </Grid>
          <Grid item xs={12} md={6}>
            <DonutRepartitionPtsQuartTempsEncaisses stats={statsTeam} />
          </Grid>
          <Grid item xs={12} md={6}>
            <DonutRepartitionFautes stats={statsTeam} />
          </Grid>
          <Grid item xs={12} md={6}>
            <DonutRepartitionFautesProvoquees stats={statsTeam} />
          </Grid>
          <Grid item xs={12}>
            <BarChartLF stats={statsTeam} />
          </Grid>
        </>
      ) : (
        <Grid item xs={12}>
          <Alert severity="info">{t("alert.nostats")}</Alert>
        </Grid>
      )}
    </Grid>
  );
};
