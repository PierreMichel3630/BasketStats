import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getStatsPlayerAvgByTeamId,
  getStatsTeamByTeamId,
} from "src/api/statistique";
import { StartingFiveBlock } from "src/components/StartingFiveBlock";
import { PlayerLeaderBlock } from "src/components/statistique/PlayerLeaderBlock";
import { TeamLeaderBlock } from "src/components/statistique/TeamLeaderBlock";
import { StatsPlayerAvg, StatsTeam } from "src/models/Statistique";

export const HomeTeamPage = () => {
  const { id } = useParams();
  const [statsPlayer, setStatsPlayer] = useState<Array<StatsPlayerAvg>>([]);
  const [statsTeam, setStatsTeam] = useState<Array<StatsTeam>>([]);

  const getStatsTeam = () => {
    if (id) {
      getStatsTeamByTeamId(Number(id)).then((res) => {
        setStatsTeam(res.data as Array<StatsTeam>);
      });
    }
  };

  const getStatsPlayer = () => {
    if (id) {
      getStatsPlayerAvgByTeamId(Number(id)).then((res) => {
        setStatsPlayer(res.data as Array<StatsPlayerAvg>);
      });
    }
  };

  useEffect(() => {
    getStatsPlayer();
    getStatsTeam();
  }, [id]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <StartingFiveBlock stats={statsPlayer} />
      </Grid>
      <Grid item xs={12}>
        <PlayerLeaderBlock stats={statsPlayer} />
      </Grid>
      <Grid item xs={12}>
        <TeamLeaderBlock stats={statsTeam} />
      </Grid>
    </Grid>
  );
};
