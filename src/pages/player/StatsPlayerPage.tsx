import {
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { TableSeasonPlayer } from "src/components/table/TableSeasonPlayer";
import { PlayerContext } from "./PlayerPage";
import { DonutRepartitionPtsMarquesPlayer } from "src/components/chart/DonutRepartitionPts";
import { DonutRepartitionShootPlayer } from "src/components/chart/DonutRepartitionShoot";
import { DonutRepartitionFautesPlayer } from "src/components/chart/DonutRepartitionFautes";

export const StatsPlayerPage = () => {
  const { avg, games } = useContext(PlayerContext);
  const [type, setType] = useState("match");

  const handleChange = (_: React.MouseEvent<HTMLElement>, newValue: string) => {
    setType(newValue);
  };

  return (
    <Grid container spacing={1} justifyContent="center">
      <Grid item xs={12}>
        <TableSeasonPlayer stats={avg} />
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <ToggleButtonGroup
          color="secondary"
          value={type}
          exclusive
          onChange={handleChange}
          size="small"
        >
          <ToggleButton value="match">
            <Typography variant="h4">Par Match</Typography>
          </ToggleButton>
          <ToggleButton value="tot">
            <Typography variant="h4">Total</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid item xs={12} md={6}>
        <DonutRepartitionPtsMarquesPlayer type={type} stats={games} />
      </Grid>
      <Grid item xs={12} md={6}>
        <DonutRepartitionShootPlayer type={type} stats={games} />
      </Grid>
      <Grid item xs={12} md={6}>
        <DonutRepartitionFautesPlayer type={type} stats={games} />
      </Grid>
    </Grid>
  );
};
