import { Avatar, Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { StatsPlayerAvg } from "src/models/Statistique";
import { sortByPourcentageStartingFive } from "src/utils/sort";
import { getBreakpoint } from "src/utils/mediaQuery";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";

interface Props {
  stats: Array<StatsPlayerAvg>;
}
export const StartingFiveBlock = ({ stats }: Props) => {
  const breakpoint = getBreakpoint();
  const isSmall = breakpoint === "xs";

  const titulaires = [...stats]
    .sort(sortByPourcentageStartingFive)
    .splice(0, 5);

  return (
    <Paper
      variant="outlined"
      sx={{ width: "100%", bgcolor: "background.paper" }}
    >
      <Grid container alignItems="center">
        <Grid item xs={12} sx={{ bgcolor: "primary.main", p: 1, mb: 1 }}>
          <Typography variant="h4" color="white">
            LE 5 MAJEUR
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ p: 1 }}>
          <Grid container spacing={1} columns={{ xs: 1, sm: 2, md: 5 }}>
            {titulaires.map((stat, index) => (
              <Grid item xs={1} key={stat.player.id}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexDirection: isSmall ? "column" : "row",
                  }}
                >
                  {index !== 0 && (
                    <Divider
                      orientation={isSmall ? "horizontal" : "vertical"}
                      flexItem
                    />
                  )}
                  <Card stat={stat} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

interface PropsCard {
  stat: StatsPlayerAvg;
}
const Card = ({ stat }: PropsCard) => {
  return (
    <Grid container spacing={1} sx={{ textAlign: "center" }}>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Avatar sx={{ width: 70, height: 70 }}>
          <PersonIcon sx={{ width: 70, height: 70 }} />
        </Avatar>
      </Grid>
      <Grid item xs={12}>
        <Link to={`/player/${stat.player.id}`}>
          <Typography
            variant="h6"
            sx={{ "&:hover": { color: "secondary.main" } }}
          >
            {stat.player.firstname} {stat.player.lastname.toUpperCase()}
          </Typography>
        </Link>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          {stat.startingfive} Titularisations (
          {((stat.startingfive / stat.games) * 100).toFixed(0)}%)
        </Typography>
      </Grid>
    </Grid>
  );
};
