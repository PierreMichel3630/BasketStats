import { Grid, Typography } from "@mui/material";
import { AddStatsBlock } from "./AddStatsBlock";
import { StatsTeamInsert, StatsTeamUpdate } from "src/models/Statistique";

interface Props {
  stats: StatsTeamUpdate;
  onChange: (field: string, value: number) => void;
}
export const AddHoopBlockTeam = ({ stats, onChange }: Props) => {
  const total =
    (stats["3ptsteam"] ?? 0) +
    (stats.lfteam ?? 0) +
    (stats["2ptsextteam"] ?? 0) +
    (stats["2ptsintteam"] ?? 0);
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h2">Paniers Marqués</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} columns={{ xs: 10 }}>
          <Grid item xs={2}>
            <AddStatsBlock
              label="3PTS"
              value={stats["3ptsteam"]}
              onChange={(value) => onChange("3ptsteam", value)}
            />
          </Grid>
          <Grid item xs={2}>
            <AddStatsBlock
              label="2PTS Int"
              value={stats["2ptsintteam"]}
              onChange={(value) => onChange("2ptsintteam", value)}
            />
          </Grid>
          <Grid item xs={2}>
            <AddStatsBlock
              label="2PTS Ext"
              value={stats["2ptsextteam"]}
              onChange={(value) => onChange("2ptsextteam", value)}
            />
          </Grid>
          <Grid item xs={2}>
            <AddStatsBlock
              label="LF"
              value={stats.lfteam}
              onChange={(value) => onChange("lfteam", value)}
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

export const AddHoopBlockOpponent = ({ stats, onChange }: Props) => {
  const total =
    (stats["3ptsopponent"] ?? 0) +
    (stats.lfopponent ?? 0) +
    (stats["2ptsextopponent"] ?? 0) +
    (stats["2ptsintopponent"] ?? 0);
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h2">Paniers Encaissés</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} columns={{ xs: 10 }}>
          <Grid item xs={2}>
            <AddStatsBlock
              label="3PTS"
              value={stats["3ptsopponent"]}
              onChange={(value) => onChange("3ptsopponent", value)}
            />
          </Grid>
          <Grid item xs={2}>
            <AddStatsBlock
              label="2PTS Int"
              value={stats["2ptsintopponent"]}
              onChange={(value) => onChange("2ptsintopponent", value)}
            />
          </Grid>
          <Grid item xs={2}>
            <AddStatsBlock
              label="2PTS Ext"
              value={stats["2ptsextopponent"]}
              onChange={(value) => onChange("2ptsextopponent", value)}
            />
          </Grid>
          <Grid item xs={2}>
            <AddStatsBlock
              label="LF"
              value={stats.lfopponent}
              onChange={(value) => onChange("lfopponent", value)}
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
