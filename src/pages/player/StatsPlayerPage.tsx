import {
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { TableGamePlayer } from "src/components/table/TableGamePlayer";
import { PlayerContext } from "./PlayerPage";
import { TableSeasonPlayer } from "src/components/table/TableSeasonPlayer";

export const StatsPlayerPage = () => {
  const { games, avg } = useContext(PlayerContext);
  const [type, setType] = useState("game");

  const handleChange = (_: React.MouseEvent<HTMLElement>, newValue: string) => {
    setType(newValue);
  };

  return (
    <Grid container spacing={1} justifyContent="center">
      <Grid item>
        <ToggleButtonGroup
          color="secondary"
          value={type}
          exclusive
          onChange={handleChange}
          size="small"
        >
          <ToggleButton value="game">
            <Typography variant="h4">Matchs</Typography>
          </ToggleButton>
          <ToggleButton value="career">
            <Typography variant="h4">Carrière</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid item xs={12}>
        {type === "game" ? (
          <TableGamePlayer stats={games.filter((el) => el.is_play)} />
        ) : (
          <TableSeasonPlayer stats={avg} />
        )}
      </Grid>
    </Grid>
  );
};
