import { Button, Grid } from "@mui/material";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlayersByEquipeId } from "src/api/player";
import { CreatePlayerDialog } from "src/components/dialog/CreatePlayerDialog";
import { PlayerLeaderBlock } from "src/components/statistique/PlayerLeaderBlock";
import { TablePlayerStats } from "src/components/table/TablePlayer";
import { Player } from "src/models/Player";
import { TeamContext } from "./TeamPage";

export const PlayersTeamPage = () => {
  const { rightTeam, players, setPlayers, statsPlayer } =
    useContext(TeamContext);
  const { id } = useParams();
  const [open, setOpen] = useState(false);

  const getPlayers = () => {
    if (id) {
      getPlayersByEquipeId(id).then((res) => {
        setPlayers(res.data.map((el) => el.player) as Array<Player>);
      });
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <PlayerLeaderBlock stats={statsPlayer} />
      </Grid>
      <Grid item xs={12}>
        <TablePlayerStats players={players} stats={statsPlayer} />
      </Grid>
      {rightTeam && (
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
