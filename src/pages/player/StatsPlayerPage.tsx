import { Grid } from "@mui/material";
import { useContext } from "react";
import { DonutRepartitionFautesPlayer } from "src/components/chart/DonutRepartitionFautes";
import { DonutRepartitionPtsMarquesPlayer } from "src/components/chart/DonutRepartitionPts";
import { DonutRepartitionShootPlayer } from "src/components/chart/DonutRepartitionShoot";
import { TableSeasonPlayer } from "src/components/table/TableSeasonPlayer";
import { PlayerContext } from "./PlayerPage";

export const StatsPlayerPage = () => {
  const { avg, games } = useContext(PlayerContext);

  return (
    <Grid container spacing={1} justifyContent="center">
      <Grid item xs={12}>
        <TableSeasonPlayer stats={avg} />
      </Grid>
      <Grid item xs={12} md={6}>
        <DonutRepartitionPtsMarquesPlayer stats={games} />
      </Grid>
      <Grid item xs={12} md={6}>
        <DonutRepartitionShootPlayer stats={games} />
      </Grid>
      <Grid item xs={12} md={6}>
        <DonutRepartitionFautesPlayer stats={games} />
      </Grid>
    </Grid>
  );
};
