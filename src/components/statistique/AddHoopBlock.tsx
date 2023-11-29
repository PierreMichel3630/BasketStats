import { Grid, Typography } from "@mui/material";
import { StatsTeamUpdate } from "src/models/Statistique";
import { AddStatsBlock } from "./AddStatsBlock";
import { useTranslation } from "react-i18next";

interface Props {
  stats: StatsTeamUpdate;
  onChange: (field: string, value: number) => void;
}
export const AddHoopBlockTeam = ({ stats, onChange }: Props) => {
  const { t } = useTranslation();
  const total =
    (stats.threeptsteam ?? 0) +
    (stats.lfteam ?? 0) +
    (stats.twoptsextteam ?? 0) +
    (stats.twoptsintteam ?? 0);
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h2">{t("commun.scoredbaskets")}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} columns={{ xs: 10 }}>
          <Grid item xs={2}>
            <AddStatsBlock
              label={t("commun.threepointsabbreviation")}
              value={stats.threeptsteam}
              onChange={(value) => onChange("threeptsteam", value)}
            />
          </Grid>
          <Grid item xs={2}>
            <AddStatsBlock
              label={t("commun.twopointsintabbreviation")}
              value={stats.twoptsintteam}
              onChange={(value) => onChange("twoptsintteam", value)}
            />
          </Grid>
          <Grid item xs={2}>
            <AddStatsBlock
              label={t("commun.twopointsextabbreviation")}
              value={stats.twoptsextteam}
              onChange={(value) => onChange("twoptsextteam", value)}
            />
          </Grid>
          <Grid item xs={2}>
            <AddStatsBlock
              label={t("commun.ftabbreviation")}
              value={stats.lfteam}
              onChange={(value) => onChange("lfteam", value)}
            />
          </Grid>
          <Grid item xs={2}>
            <AddStatsBlock label={t("commun.total")} value={total} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export const AddHoopBlockOpponent = ({ stats, onChange }: Props) => {
  const { t } = useTranslation();
  const total =
    (stats.threeptsopponent ?? 0) +
    (stats.lfopponent ?? 0) +
    (stats.twoptsextopponent ?? 0) +
    (stats.twoptsintopponent ?? 0);
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h2">{t("commun.concededbaskets")}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} columns={{ xs: 10 }}>
          <Grid item xs={2}>
            <AddStatsBlock
              label={t("commun.threepointsabbreviation")}
              value={stats.threeptsopponent}
              onChange={(value) => onChange("threeptsopponent", value)}
            />
          </Grid>
          <Grid item xs={2}>
            <AddStatsBlock
              label={t("commun.twopointsintabbreviation")}
              value={stats.twoptsintopponent}
              onChange={(value) => onChange("twoptsintopponent", value)}
            />
          </Grid>
          <Grid item xs={2}>
            <AddStatsBlock
              label={t("commun.twopointsextabbreviation")}
              value={stats.twoptsextopponent}
              onChange={(value) => onChange("twoptsextopponent", value)}
            />
          </Grid>
          <Grid item xs={2}>
            <AddStatsBlock
              label={t("commun.ftabbreviation")}
              value={stats.lfopponent}
              onChange={(value) => onChange("lfopponent", value)}
            />
          </Grid>
          <Grid item xs={2}>
            <AddStatsBlock label={t("commun.total")} value={total} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
