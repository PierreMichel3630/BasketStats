import { Grid, Typography } from "@mui/material";
import { Game } from "src/models/Game";
import { StatsTeamUpdate } from "src/models/Statistique";
import { AddStatsBlock } from "./AddStatsBlock";

interface Props {
  game: Game;
  stats: StatsTeamUpdate;
  onChange: (field: string, value: number) => void;
}
export const AddFoulsBlockTeam = ({ game, stats, onChange }: Props) => {
  const total =
    (stats.foul0lfteam ?? 0) +
    (stats.foul1lfteam ?? 0) +
    (stats.foul2lfteam ?? 0) +
    (stats.foul3lfteam ?? 0);
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h2">Fautes {game.team.name}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} columns={{ xs: 10 }}>
          <Grid item xs={2}>
            <AddStatsBlock
              label="0LF"
              value={stats.foul0lfteam}
              onChange={(value) => onChange("foul0lfteam", value)}
            />
          </Grid>
          <Grid item xs={2}>
            <AddStatsBlock
              label="1LF"
              value={stats.foul1lfteam}
              onChange={(value) => onChange("foul1lfteam", value)}
            />
          </Grid>
          <Grid item xs={2}>
            <AddStatsBlock
              label="2LF"
              value={stats.foul2lfteam}
              onChange={(value) => onChange("foul2lfteam", value)}
            />
          </Grid>
          <Grid item xs={2}>
            <AddStatsBlock
              label="3LF"
              value={stats.foul3lfteam}
              onChange={(value) => onChange("foul3lfteam", value)}
            />
          </Grid>
          <Grid item xs={2}>
            <AddStatsBlock label="Total" value={total} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export const AddFoulsBlockOpponent = ({ game, stats, onChange }: Props) => {
  const total =
    (stats.foul0lfopponent ?? 0) +
    (stats.foul1lfopponent ?? 0) +
    (stats.foul2lfopponent ?? 0) +
    (stats.foul3lfopponent ?? 0);
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h2">Fautes {game.opponent}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} columns={{ xs: 10 }}>
          <Grid item xs={2}>
            <AddStatsBlock
              label="0LF"
              value={stats.foul0lfopponent}
              onChange={(value) => onChange("foul0lfopponent", value)}
            />
          </Grid>
          <Grid item xs={2}>
            <AddStatsBlock
              label="1LF"
              value={stats.foul1lfopponent}
              onChange={(value) => onChange("foul1lfopponent", value)}
            />
          </Grid>
          <Grid item xs={2}>
            <AddStatsBlock
              label="2LF"
              value={stats.foul2lfopponent}
              onChange={(value) => onChange("foul2lfopponent", value)}
            />
          </Grid>
          <Grid item xs={2}>
            <AddStatsBlock
              label="3LF"
              value={stats.foul3lfopponent}
              onChange={(value) => onChange("foul3lfopponent", value)}
            />
          </Grid>
          <Grid item xs={2}>
            <AddStatsBlock label="Total" value={total} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
