import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { StatsTeamAdd } from "../card/CardAddStatsTeam";
import { AddStatsBlock } from "./AddStatsBlock";

interface PropsV2 {
  stats: StatsTeamAdd;
  onChange: (field: string, value: number) => void;
}
export const AddFoulsBlockOpponentV2 = ({ stats, onChange }: PropsV2) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2} columns={{ xs: 4 }}>
      <Grid item xs={1}>
        <AddStatsBlock
          label={t("commun.foul0ftabbreviation")}
          value={stats.foul0lfopponent}
          onChange={(value) => onChange("foul0lfopponent", value)}
        />
      </Grid>
      <Grid item xs={1}>
        <AddStatsBlock
          label={t("commun.foul1ftabbreviation")}
          value={stats.foul1lfopponent}
          onChange={(value) => onChange("foul1lfopponent", value)}
        />
      </Grid>
      <Grid item xs={1}>
        <AddStatsBlock
          label={t("commun.foul2ftabbreviation")}
          value={stats.foul2lfopponent}
          onChange={(value) => onChange("foul2lfopponent", value)}
        />
      </Grid>
      <Grid item xs={1}>
        <AddStatsBlock
          label={t("commun.foul3ftabbreviation")}
          value={stats.foul3lfopponent}
          onChange={(value) => onChange("foul3lfopponent", value)}
        />
      </Grid>
    </Grid>
  );
};
