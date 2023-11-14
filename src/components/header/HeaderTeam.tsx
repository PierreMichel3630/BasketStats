import { Box, Grid, Typography } from "@mui/material";
import { percent, px } from "csx";
import { Game } from "src/models/Game";
import { Team } from "src/models/Team";
import { style } from "typestyle";

const imageCss = style({
  width: percent(100),
  maxHeight: px(250),
  borderRadius: px(15),
  objectFit: "cover",
});

interface Props {
  team: Team;
  games: Array<Game>;
}

export const HeaderTeam = ({ team, games }: Props) => {
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
      <Grid item xs={4}>
        {team.image && <img src={team.image} className={imageCss} />}
      </Grid>
      <Grid item xs={8}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h2">
              {team.name} - {team.club}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ fontWeight: 500 }}>
              {wins.length} Victoires - {loses.length} Défaites
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
