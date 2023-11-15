import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGamesById } from "src/api/game";
import {
  getStatsPlayerByGameId,
  getStatsTeamByGameId,
} from "src/api/statistique";
import { HeaderGame } from "src/components/header/HeaderGame";
import { TableBoxscore } from "src/components/table/TableBoxscore";
import { TableTeamStats } from "src/components/table/TableTeamStats";
import { Game } from "src/models/Game";
import { StatsPlayer, StatsTeam } from "src/models/Statistique";

export const PageStatsGame = () => {
  const { id } = useParams();

  const [game, setGame] = useState<Game | undefined>(undefined);
  const [statsTeam, setStatsTeam] = useState<StatsTeam | undefined>(undefined);
  const [statsPlayer, setStatsPlayer] = useState<Array<StatsPlayer>>([]);

  const getGame = () => {
    if (id) {
      getGamesById(id).then((res) => {
        setGame(res.data as Game);
      });
    }
  };

  const getStatsTeam = () => {
    if (id) {
      getStatsTeamByGameId(Number(id)).then((res) => {
        setStatsTeam(res.data as StatsTeam);
      });
    }
  };

  const getStatsPlayer = () => {
    if (id) {
      getStatsPlayerByGameId(Number(id)).then((res) => {
        setStatsPlayer(res.data as Array<StatsPlayer>);
      });
    }
  };

  useEffect(() => {
    getGame();
    getStatsTeam();
    getStatsPlayer();
  }, [id]);

  return (
    <Grid container spacing={1}>
      {game && statsTeam && (
        <Grid item xs={12}>
          <HeaderGame game={game} stats={statsTeam} />
        </Grid>
      )}
      <Grid item xs={12}>
        <TableBoxscore stats={statsPlayer} />
      </Grid>
      {game && statsTeam && (
        <Grid item xs={12}>
          <TableTeamStats game={game} stats={statsTeam} />
        </Grid>
      )}
    </Grid>
  );
};
