import { Grid, Typography } from "@mui/material";
import { Game } from "src/models/Game";
import { StatsTeamUpdate } from "src/models/Statistique";
import { AddScoreBlock } from "../AddScoreBlock";

interface Props {
  game: Game;
  stats: StatsTeamUpdate;
  onChange: (field: string, value: number) => void;
}

export const AddScoreStatsBlock = ({ game, stats, onChange }: Props) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h2">Score</Typography>
      </Grid>
      <Grid item xs={12}>
        <AddScoreBlock
          team={{
            label: game.team.name,
            value: stats.q1team,
            onChange: (value) => onChange("q1team", value),
          }}
          opponent={{
            label: game.opponent,
            value: stats.q1opponent,
            onChange: (value) => onChange("q1opponent", value),
          }}
          label="Quart-Temps 1"
        />
      </Grid>
      <Grid item xs={12}>
        <AddScoreBlock
          team={{
            label: game.team.name,
            value: stats.q2team,
            onChange: (value) => onChange("q2team", value),
          }}
          opponent={{
            label: game.opponent,
            value: stats.q2opponent,
            onChange: (value) => onChange("q2opponent", value),
          }}
          label="Quart-Temps 2"
        />
      </Grid>
      <Grid item xs={12}>
        <AddScoreBlock
          team={{
            label: game.team.name,
            value: stats.q3team,
            onChange: (value) => onChange("q3team", value),
          }}
          opponent={{
            label: game.opponent,
            value: stats.q3opponent,
            onChange: (value) => onChange("q3opponent", value),
          }}
          label="Quart-Temps 3"
        />
      </Grid>
      <Grid item xs={12}>
        <AddScoreBlock
          team={{
            label: game.team.name,
            value: stats.q4team,
            onChange: (value) => onChange("q4team", value),
          }}
          opponent={{
            label: game.opponent,
            value: stats.q4opponent,
            onChange: (value) => onChange("q4opponent", value),
          }}
          label="Quart-Temps 4"
        />
      </Grid>
    </Grid>
  );
};
