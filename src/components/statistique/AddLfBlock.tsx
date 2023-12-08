import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { StatsTeamAdd } from "../card/CardAddStatsTeam";
import { AddStatsBlock } from "./AddStatsBlock";

interface Props {
  stats: StatsTeamAdd;
  onChange: (field: string, value: number) => void;
}
export const AddLfBlock = ({ stats, onChange }: Props) => {
  const { t } = useTranslation();
  return (
    <Grid container spacing={2} columns={{ xs: 10 }}>
      <Grid item xs={2}>
        <AddStatsBlock
          label={t("commun.q1abbreviation")}
          value={stats.lfq1opponent}
          onChange={(value) => onChange("lfq1opponent", value)}
        />
      </Grid>
      <Grid item xs={2}>
        <AddStatsBlock
          label={t("commun.q2abbreviation")}
          value={stats.lfq2opponent}
          onChange={(value) => onChange("lfq2opponent", value)}
        />
      </Grid>
      <Grid item xs={2}>
        <AddStatsBlock
          label={t("commun.q3abbreviation")}
          value={stats.lfq3opponent}
          onChange={(value) => onChange("lfq3opponent", value)}
        />
      </Grid>
      <Grid item xs={2}>
        <AddStatsBlock
          label={t("commun.q4abbreviation")}
          value={stats.lfq4opponent}
          onChange={(value) => onChange("lfq4opponent", value)}
        />
      </Grid>
      <Grid item xs={2}>
        <AddStatsBlock
          label={t("commun.prolongationabbreviation")}
          value={stats.lfpopponent}
          onChange={(value) => onChange("lfpopponent", value)}
        />
      </Grid>
    </Grid>
  );
};
