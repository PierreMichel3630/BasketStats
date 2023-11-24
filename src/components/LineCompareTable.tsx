import { Box, Grid, Typography } from "@mui/material";
import { percent, px } from "csx";

export interface LineCompareTable {
  label: string;
  value1: number;
  value2: number;
  fixed?: number;
}

interface PropsLine {
  value: LineCompareTable;
  max?: number;
}

export const LineCompareTable = ({ value, max }: PropsLine) => {
  const isWin = value.value1 > value.value2;
  const isLose = value.value2 > value.value1;
  const percent1 = max ? (value.value1 * 100) / max : value.value1;
  const percent2 = max ? (value.value2 * 100) / max : value.value2;
  return (
    <Grid container alignItems="center">
      <Grid
        item
        xs={5}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          color={isWin ? "primary.main" : "secondary.main"}
        >
          {value.fixed ? value.value1.toFixed(value.fixed) : value.value1}
        </Typography>
        <Box
          sx={{
            width: percent(percent1),
            height: px(25),
            bgcolor: isWin ? "primary.main" : "secondary.main",
          }}
        />
      </Grid>
      <Grid item xs={2} sx={{ textAlign: "center" }}>
        <Typography variant="h4">{value.label.toUpperCase()}</Typography>
      </Grid>
      <Grid
        item
        xs={5}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: percent(percent2),
            height: px(25),
            bgcolor: isLose ? "primary.main" : "secondary.main",
          }}
        />
        <Typography
          variant="h4"
          color={isLose ? "primary.main" : "secondary.main"}
        >
          {value.fixed ? value.value2.toFixed(value.fixed) : value.value2}
        </Typography>
      </Grid>
    </Grid>
  );
};
