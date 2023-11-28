import { Grid } from "@mui/material";
import { useContext } from "react";
import { TableGamePlayer } from "src/components/table/TableGamePlayer";
import { PlayerContext } from "./PlayerPage";

export const GamesPlayerPage = () => {
  const { games } = useContext(PlayerContext);

  return (
    <Grid container spacing={1} justifyContent="center">
      <Grid item xs={12}>
        <TableGamePlayer stats={games.filter((el) => el.is_play)} />
      </Grid>
    </Grid>
  );
};
