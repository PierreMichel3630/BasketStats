import { Button, Grid } from "@mui/material";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { getGamesByTeamId } from "src/api/game";
import { CreateGameDialog } from "src/components/dialog/CreateGameDialog";
import { TableGame } from "src/components/table/TableGame";
import { Game } from "src/models/Game";
import { TeamContext } from "./TeamPage";

export const GameTeamPage = () => {
  const { games, setGames, rightTeam } = useContext(TeamContext);
  const { id } = useParams();
  const [open, setOpen] = useState(false);

  const getGames = () => {
    if (id) {
      getGamesByTeamId(id).then((res) => {
        setGames(res.data as Array<Game>);
      });
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TableGame games={games} isRight={rightTeam !== undefined} />
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
            Ajouter un match
          </Button>
        </Grid>
      )}
      <CreateGameDialog
        open={open}
        close={() => {
          setOpen(false);
          getGames();
        }}
        teamId={Number(id)}
      />
    </Grid>
  );
};
