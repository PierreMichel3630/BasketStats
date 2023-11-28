import { Grid } from "@mui/material";
import { useContext } from "react";
import { PlayerContext } from "./PlayerPage";
import { TableLast5GamePlayer } from "src/components/table/TableGamePlayer";
import { ComparePlayerAvg } from "src/components/compare/ComparePlayerAvg";

export const ProfilPlayerPage = () => {
  const { games, teams, playerAvg, avg } = useContext(PlayerContext);

  return (
    <Grid container spacing={1} justifyContent="center">
      <Grid item xs={12}>
        <ComparePlayerAvg
          playerAvgs={playerAvg}
          playerStat={avg}
          teams={teams}
        />
      </Grid>
      <Grid item xs={12}>
        <TableLast5GamePlayer stats={games.filter((el) => el.is_play)} />
      </Grid>
    </Grid>
  );
};
