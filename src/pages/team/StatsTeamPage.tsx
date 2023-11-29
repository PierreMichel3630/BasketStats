import {
  Alert,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
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
import { useTranslation } from "react-i18next";

export const StatsTeamPage = () => {
  const { statsTeam } = useContext(TeamContext);
  const { t } = useTranslation();
  const [type, setType] = useState("match");

  const handleChange = (_: React.MouseEvent<HTMLElement>, newValue: string) => {
    setType(newValue);
  };

  return (
    <Grid container spacing={1} justifyContent="center">
      {statsTeam.length > 0 ? (
        <>
          <Grid item>
            <ToggleButtonGroup
              color="secondary"
              value={type}
              exclusive
              onChange={handleChange}
              size="small"
            >
              <ToggleButton value="match">
                <Typography variant="h6">{t("commun.pergame")}</Typography>
              </ToggleButton>
              <ToggleButton value="tot">
                <Typography variant="h6">{t("commun.total")}</Typography>
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={12}>
            <TeamLeaderBlock stats={statsTeam} type={type} />
          </Grid>
          <Grid item xs={12} md={6}>
            <DonutRepartitionPtsMarques type={type} stats={statsTeam} />
          </Grid>
          <Grid item xs={12} md={6}>
            <DonutRepartitionPtsEncaisses type={type} stats={statsTeam} />
          </Grid>
          <Grid item xs={12} md={6}>
            <DonutRepartitionPtsQuartTempsMarques
              type={type}
              stats={statsTeam}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DonutRepartitionPtsQuartTempsEncaisses
              type={type}
              stats={statsTeam}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DonutRepartitionFautes type={type} stats={statsTeam} />
          </Grid>
          <Grid item xs={12} md={6}>
            <DonutRepartitionFautesProvoquees type={type} stats={statsTeam} />
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
