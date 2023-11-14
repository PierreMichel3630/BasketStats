import { Grid, Typography } from "@mui/material";
import { StatsTeam } from "src/models/Statistique";
import { CardStats } from "../card/CardStats";

interface Props {
  stats: Array<StatsTeam>;
}

export const TeamLeaderBlock = ({ stats }: Props) => {
  const ptsMarques = stats.map(
    (value) =>
      (value.q1team ?? 0) +
      (value.q2team ?? 0) +
      (value.q3team ?? 0) +
      (value.q4team ?? 0)
  );
  const ptsMarquesMoy =
    ptsMarques.reduce((acc, value) => acc + value, 0) / ptsMarques.length;
  const ptsMarquesMin = Math.min(...ptsMarques);
  const ptsMarquesMax = Math.max(...ptsMarques);

  const ptsEncaisses = stats.map(
    (value) =>
      (value.q1opponent ?? 0) +
      (value.q2opponent ?? 0) +
      (value.q3opponent ?? 0) +
      (value.q4opponent ?? 0)
  );
  const ptsEncaissesMoy =
    ptsEncaisses.reduce((acc, value) => acc + value, 0) / ptsEncaisses.length;
  const ptsEncaissesMin = Math.min(...ptsEncaisses);
  const ptsEncaissesMax = Math.max(...ptsEncaisses);

  const troisptsMarque = stats.map((value) => value["3ptsteam"] ?? 0);
  const troisptsMarqueMoy =
    troisptsMarque.reduce((acc, value) => acc + value, 0) /
    troisptsMarque.length;
  const troisptsMarqueMin = Math.min(...troisptsMarque);
  const troisptsMarqueMax = Math.max(...troisptsMarque);

  const lfptsMarque = stats.map((value) => value.lfteam ?? 0);
  const lfptsMarqueMoy =
    lfptsMarque.reduce((acc, value) => acc + value, 0) / lfptsMarque.length;
  const lfptsMarqueMin = Math.min(...lfptsMarque);
  const lfptsMarqueMax = Math.max(...lfptsMarque);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h4">Team Stats</Typography>
      </Grid>
      <Grid item xs={3}>
        <CardStats
          label="Pts Marqués"
          value={ptsMarquesMoy}
          min={ptsMarquesMin}
          max={ptsMarquesMax}
        />
      </Grid>
      <Grid item xs={3}>
        <CardStats
          label="Pts Encaissés"
          value={ptsEncaissesMoy}
          min={ptsEncaissesMin}
          max={ptsEncaissesMax}
        />
      </Grid>
      <Grid item xs={3}>
        <CardStats
          label="3Pts Marqués"
          value={troisptsMarqueMoy}
          min={troisptsMarqueMin}
          max={troisptsMarqueMax}
        />
      </Grid>
      <Grid item xs={3}>
        <CardStats
          label="LF Marqués"
          value={lfptsMarqueMoy}
          min={lfptsMarqueMin}
          max={lfptsMarqueMax}
        />
      </Grid>
    </Grid>
  );
};
