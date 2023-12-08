import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { getStatsPlayerAvgByTeamIdIn } from "src/api/statistique";
import { ComparePlayerBlock } from "src/components/compare/ComparePlayerBlock";
import { StatsPlayerAvg } from "src/models/Statistique";
import { PlayerContext } from "./PlayerPage";

export const ComparePlayerPage = () => {
  const { teams, player, shoots } = useContext(PlayerContext);
  const [stats, setStats] = useState<Array<StatsPlayerAvg>>([]);

  const getStatsAvg = () => {
    if (teams.length > 0) {
      const ids = teams.map((el) => el.id);
      getStatsPlayerAvgByTeamIdIn(ids).then((res) => {
        setStats(res.data as Array<StatsPlayerAvg>);
      });
    }
  };

  useEffect(() => {
    getStatsAvg();
  }, [teams]);

  return (
    <Grid container spacing={1}>
      {player && stats.length > 1 && (
        <Grid item xs={12} sx={{ mt: 3 }}>
          <ComparePlayerBlock
            player={player}
            statsAvg={stats}
            shoots={shoots}
          />
        </Grid>
      )}
    </Grid>
  );
};
