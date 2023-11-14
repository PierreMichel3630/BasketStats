import { Grid, Typography } from "@mui/material";
import { percent } from "csx";
import { Team } from "src/models/Team";
import { style } from "typestyle";

const imageCss = style({
  width: percent(100),
});

interface Props {
  team: Team;
}

export const HeaderTeam = ({ team }: Props) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        {team.image && <img src={team.image} className={imageCss} />}
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h2">{team.name}</Typography>
        <Typography variant="h2">{team.club}</Typography>
      </Grid>
    </Grid>
  );
};
