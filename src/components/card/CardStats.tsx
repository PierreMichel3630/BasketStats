import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import { Player } from "src/models/Player";
import { Colors } from "src/style/Colors";

import PersonIcon from "@mui/icons-material/Person";

interface Props {
  label: string;
  value: number;
  max?: number;
  min?: number;
}

export const CardStats = ({ label, value, max, min }: Props) => (
  <Paper sx={{ p: 2, textAlign: "center" }}>
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h2">{label}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h2">{value}</Typography>
      </Grid>
      {min !== undefined && (
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "center",
            color: Colors.red,
          }}
        >
          <Typography variant="h6">Min</Typography>
          <Typography variant="body1">{min}</Typography>
        </Grid>
      )}
      {max !== undefined && (
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "center",
            color: Colors.green,
          }}
        >
          <Typography variant="h6">Max</Typography>
          <Typography variant="body1">{max}</Typography>
        </Grid>
      )}
    </Grid>
  </Paper>
);

interface PropsCardStatsPlayer {
  player: Player;
  label: string;
  value: number;
}

export const CardStatsPlayer = ({
  label,
  value,
  player,
}: PropsCardStatsPlayer) => (
  <Paper sx={{ p: 2 }}>
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h4">{label}</Typography>
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", gap: 2 }}>
        <Avatar sx={{ width: 50, height: 50 }}>
          <PersonIcon fontSize="large" />
        </Avatar>
        <Box>
          <Typography variant="body1">{`${player.firstname} ${player.lastname}`}</Typography>
          <Typography variant="h2">{value}</Typography>
        </Box>
      </Grid>
    </Grid>
  </Paper>
);
