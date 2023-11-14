import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { percent, px } from "csx";
import { Link } from "react-router-dom";
import { Team } from "src/models/Team";
import { style } from "typestyle";

const cardCss = style({
  height: percent(100),
});

interface Props {
  team: Team;
}

export const CardTeam = ({ team }: Props) => {
  return (
    <Link to={`/team/${team.id}`}>
      <Card className={cardCss}>
        {team.image && (
          <CardMedia
            sx={{
              width: percent(100),
              aspectRatio: "auto",
              minHeight: px(250),
            }}
            image={team.image}
            title={team.name}
          />
        )}

        <CardContent sx={{ position: "relative" }}>
          <Typography variant="h4">{team.name}</Typography>
          <Typography variant="body1">{team.club}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
};
