import { Divider, Grid, Paper, Typography } from "@mui/material";
import { percent, px } from "csx";

import GitHubIcon from "@mui/icons-material/GitHub";

export const Footer = () => {
  const URLGITHUB = "https://github.com/PierreMichel3630/MovieWatch";
  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noreferrer");
  };

  return (
    <Paper
      sx={{
        bottom: 0,
        width: percent(100),
        mt: 1,
        padding: 1,
        position: "fixed",
      }}
      component="footer"
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid
          item
          onClick={() => openInNewTab(URLGITHUB)}
          sx={{
            cursor: "pointer",
            display: "flex",
            gap: 1,
            flexDirection: "row",
          }}
        >
          <GitHubIcon sx={{ marginRight: 1, verticalAlign: "middle" }} />
          <Typography variant="body1">Github</Typography>
        </Grid>
        <Grid item>
          <Divider orientation="vertical" sx={{ height: px(20) }} />
        </Grid>
        <Grid item>
          <Typography variant="body1">Développé par Pierre</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
