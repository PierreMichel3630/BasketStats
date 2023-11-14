import { Grid } from "@mui/material";
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

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TeamLeaderBlock stats={stats} />
      </Grid>
      <Grid item xs={12} md={6}>
        <DonutRepartitionPtsMarques stats={stats} />
      </Grid>
      <Grid item xs={12} md={6}>
        <DonutRepartitionPtsEncaisses stats={stats} />
      </Grid>
      <Grid item xs={12} md={6}>
        <DonutRepartitionPtsQuartTempsMarques stats={stats} />
      </Grid>
      <Grid item xs={12} md={6}>
        <DonutRepartitionPtsQuartTempsEncaisses stats={stats} />
      </Grid>
      <Grid item xs={12} md={6}>
        <DonutRepartitionFautes stats={stats} />
      </Grid>
      <Grid item xs={12} md={6}>
        <DonutRepartitionFautesProvoquees stats={stats} />
      </Grid>
    </Grid>
  );
};
