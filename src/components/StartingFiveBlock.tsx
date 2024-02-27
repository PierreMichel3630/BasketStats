import PersonIcon from "@mui/icons-material/Person";
import { Avatar, Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { padding, px } from "csx";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { UserContext } from "src/App";
import { StatsPlayerAvg } from "src/models/Statistique";
import { getBreakpoint } from "src/utils/mediaQuery";
import {
  sortByPourcentageStartingFive,
  sortByStartingFive,
} from "src/utils/sort";
import { ToogleButtonTotal } from "./ToogleButton";

interface Props {
  stats: Array<StatsPlayerAvg>;
}
export const StartingFiveBlock = ({ stats }: Props) => {
  const { t } = useTranslation();
  const { total, setTotal } = useContext(UserContext);
  const breakpoint = getBreakpoint();
  const isSmall = breakpoint === "xs";

  const isTypeMoy = !total;

  const titulaires = [...stats]
    .sort(isTypeMoy ? sortByPourcentageStartingFive : sortByStartingFive)
    .splice(0, 5);

  return (
    <Paper
      variant="outlined"
      sx={{ width: "100%", bgcolor: "background.paper" }}
    >
      <Grid container alignItems="center">
        <Grid
          item
          xs={12}
          sx={{
            bgcolor: "primary.main",
            p: padding(px(2), px(8)),
            mb: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4" color="white" textTransform="uppercase">
            {t("commun.starter")}
          </Typography>
          <ToogleButtonTotal
            value={total ? "total" : "pergame"}
            onChange={(value) => setTotal(value === "total")}
          />
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
  const { t } = useTranslation();
  return (
    <Link to={`/player/${stat.player.id}`}>
      <Grid container spacing={1} sx={{ textAlign: "center" }}>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Avatar sx={{ width: 70, height: 70 }}>
            <PersonIcon sx={{ width: 70, height: 70 }} />
          </Avatar>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            sx={{ "&:hover": { color: "secondary.main" } }}
          >
            {stat.player.firstname} {stat.player.lastname.toUpperCase()}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            {stat.startingfive} {t("commun.inclusionsteam")} (
            {((stat.startingfive / stat.games) * 100).toFixed(0)}%)
          </Typography>
        </Grid>
      </Grid>
    </Link>
  );
};
