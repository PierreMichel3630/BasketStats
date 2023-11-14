import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlayersByEquipeId } from "src/api/player";
import { CreatePlayerDialog } from "src/components/dialog/CreatePlayerDialog";
import { TablePlayer } from "src/components/table/TablePlayer";
import { Player } from "src/models/Player";

export const PlayersTeamPage = () => {
  const { id } = useParams();
  const [players, setPlayers] = useState<Array<Player>>([]);
  const [open, setOpen] = useState(false);

  const getPlayers = () => {
    if (id) {
      getPlayersByEquipeId(id).then((res) => {
        setPlayers(res.data.map((el) => el.player) as Array<Player>);
      });
    }
  };

  useEffect(() => {
    getPlayers();
  }, [id]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TablePlayer players={players} />
      </Grid>
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
