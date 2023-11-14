import { Grid, Paper, Typography } from "@mui/material";
import { Colors } from "src/style/Colors";

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
