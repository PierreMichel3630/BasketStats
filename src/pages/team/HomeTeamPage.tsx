import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGamesByTeamId } from "src/api/game";
import {
  getStatsPlayerAvgByTeamId,
  getStatsTeamByTeamId,
} from "src/api/statistique";
import { LastGameBlock, NextGameBlock } from "src/components/card/CardGame";
import { PlayerLeaderBlock } from "src/components/statistique/PlayerLeaderBlock";
import { TeamLeaderBlock } from "src/components/statistique/TeamLeaderBlock";
import { Game } from "src/models/Game";
import { StatsPlayerAvg, StatsTeam } from "src/models/Statistique";

export const HomeTeamPage = () => {
  const { id } = useParams();
  const [statsPlayer, setStatsPlayer] = useState<Array<StatsPlayerAvg>>([]);
  const [statsTeam, setStatsTeam] = useState<Array<StatsTeam>>([]);
  const [games, setGames] = useState<Array<Game>>([]);

  const getGames = () => {
    if (id) {
      getGamesByTeamId(id).then((res) => {
        setGames(res.data as Array<Game>);
      });
    }
  };

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
    getGames();
  }, [id]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={9}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <PlayerLeaderBlock stats={statsPlayer} />
          </Grid>
          <Grid item xs={12}>
            <TeamLeaderBlock stats={statsTeam} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <NextGameBlock games={games} />
          </Grid>
          <Grid item xs={12}>
            <LastGameBlock games={games} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
