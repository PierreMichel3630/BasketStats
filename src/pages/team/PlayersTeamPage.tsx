import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlayersByEquipeId } from "src/api/player";
import { getStatsPlayerAvgByTeamId } from "src/api/statistique";
import { CreatePlayerDialog } from "src/components/dialog/CreatePlayerDialog";
import { PlayerLeaderBlock } from "src/components/statistique/PlayerLeaderBlock";
import { TablePlayerStats } from "src/components/table/TablePlayer";
import { useAuth } from "src/context/AuthProviderSupabase";
import { Player } from "src/models/Player";
import { StatsPlayerAvg } from "src/models/Statistique";

export const PlayersTeamPage = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [players, setPlayers] = useState<Array<Player>>([]);
  const [stats, setStats] = useState<Array<StatsPlayerAvg>>([]);
  const [open, setOpen] = useState(false);

  const getPlayers = () => {
    if (id) {
      getPlayersByEquipeId(id).then((res) => {
        setPlayers(res.data.map((el) => el.player) as Array<Player>);
      });
    }
  };

  const getStats = () => {
    if (id) {
      getStatsPlayerAvgByTeamId(Number(id)).then((res) => {
        setStats(res.data as Array<StatsPlayerAvg>);
      });
    }
  };

  useEffect(() => {
    getPlayers();
    getStats();
  }, [id]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <PlayerLeaderBlock stats={stats} />
      </Grid>
      <Grid item xs={12}>
        <TablePlayerStats players={players} stats={stats} />
      </Grid>
      {user && (
        <Grid item xs={12}>
          <Button
            disableElevation
            fullWidth
            size="small"
            variant="contained"
            color="secondary"
            onClick={() => setOpen(true)}
          >
            Ajouter un joueur
          </Button>
        </Grid>
      )}
      <CreatePlayerDialog
        open={open}
        close={() => {
          setOpen(false);
          getPlayers();
        }}
        teamId={Number(id)}
      />
    </Grid>
  );
};
