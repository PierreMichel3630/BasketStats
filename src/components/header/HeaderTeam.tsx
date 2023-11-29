import { Box, Divider, Grid, Typography } from "@mui/material";
import { percent, px } from "csx";
import { useTranslation } from "react-i18next";
import { Game } from "src/models/Game";
import { Team } from "src/models/Team";
import { style } from "typestyle";

const imageCss = style({
  width: percent(100),
  maxHeight: px(150),
  borderRadius: px(15),
  objectFit: "cover",
});

interface Props {
  team: Team;
  games: Array<Game>;
}

export const HeaderTeam = ({ team, games }: Props) => {
  const { t } = useTranslation();
  const wins = games.filter(
    (el) =>
      el.opponent_score !== null &&
      el.team_score !== null &&
      el.opponent_score < el.team_score
  );

  const loses = games.filter(
    (el) =>
      el.opponent_score !== null &&
      el.team_score !== null &&
      el.opponent_score > el.team_score
  );

  return (
    <Grid container spacing={1}>
      <Grid item xs={2}>
        {team.image && <img src={team.image} className={imageCss} />}
      </Grid>
      <Grid item xs={9}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
              <Typography variant="h1">{team.name}</Typography>
              <Divider
                orientation="vertical"
                flexItem
                variant="middle"
                sx={{ borderRightWidth: 3, borderColor: "initial" }}
              />
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography variant="h2">{wins.length}</Typography>
                <Typography variant="h6">
                  {t("commun.victoryabbreviation")}
                </Typography>
                <Typography variant="h2">-</Typography>
                <Typography variant="h2">{loses.length}</Typography>
                <Typography variant="h6">
                  {t("commun.defeatabbreviation")}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4">{team.club}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
