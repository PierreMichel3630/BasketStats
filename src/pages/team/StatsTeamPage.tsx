import {
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStatsTeamByTeamId } from "src/api/statistique";
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
import { StatsTeam } from "src/models/Statistique";

export const StatsTeamPage = () => {
  const { id } = useParams();
  const [type, setType] = useState("match");
  const [stats, setStats] = useState<Array<StatsTeam>>([]);

  const getStats = () => {
    if (id) {
      getStatsTeamByTeamId(Number(id)).then((res) => {
        setStats(res.data as Array<StatsTeam>);
      });
    }
  };

  useEffect(() => {
    getStats();
  }, [id]);

  const handleChange = (_: React.MouseEvent<HTMLElement>, newValue: string) => {
    setType(newValue);
  };

  return (
    <Grid container spacing={1} justifyContent="center">
      <Grid item>
        <ToggleButtonGroup
          color="secondary"
          value={type}
          exclusive
          onChange={handleChange}
          size="small"
        >
          <ToggleButton value="match">
            <Typography variant="h4">Par Match</Typography>
          </ToggleButton>
          <ToggleButton value="tot">
            <Typography variant="h4">Total</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid item xs={12}>
        <TeamLeaderBlock stats={stats} type={type} />
      </Grid>
      <Grid item xs={12} md={6}>
        <DonutRepartitionPtsMarques type={type} stats={stats} />
      </Grid>
      <Grid item xs={12} md={6}>
        <DonutRepartitionPtsEncaisses type={type} stats={stats} />
      </Grid>
      <Grid item xs={12} md={6}>
        <DonutRepartitionPtsQuartTempsMarques type={type} stats={stats} />
      </Grid>
      <Grid item xs={12} md={6}>
        <DonutRepartitionPtsQuartTempsEncaisses type={type} stats={stats} />
      </Grid>
      <Grid item xs={12} md={6}>
        <DonutRepartitionFautes type={type} stats={stats} />
      </Grid>
      <Grid item xs={12} md={6}>
        <DonutRepartitionFautesProvoquees type={type} stats={stats} />
      </Grid>
    </Grid>
  );
};
