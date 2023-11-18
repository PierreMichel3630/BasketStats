import { Box, Grid, TextField, Typography } from "@mui/material";

interface Value {
  label: string;
  value: null | number;
  onChange: (value: number) => void;
}
interface Props {
  team: Value;
  opponent: Value;
  label?: string;
}
export const AddScoreBlock = ({ team, opponent, label }: Props) => {
  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={5} />
      <Grid item xs={2}>
        {label && (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="caption">{label}</Typography>
          </Box>
        )}
      </Grid>
      <Grid item xs={5} />
      <Grid item xs={5} sx={{ textAlign: "right" }}>
        <Typography variant="h4">{team.label}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Box sx={{ flex: 1 }}>
            <TextField
              value={team.value !== null ? team.value : undefined}
              onChange={(event) => team.onChange(Number(event.target.value))}
              type="number"
              size="small"
              fullWidth
            />
          </Box>
          <Typography variant="h4">-</Typography>
          <Box sx={{ flex: 1 }}>
            <TextField
              value={opponent.value !== null ? opponent.value : undefined}
              onChange={(event) =>
                opponent.onChange(Number(event.target.value))
              }
              type="number"
              size="small"
              fullWidth
            />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={5} sx={{ textAlign: "left" }}>
        <Typography variant="h4">{opponent.label}</Typography>
      </Grid>
    </Grid>
  );
};
