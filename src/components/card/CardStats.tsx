import { Avatar, Box, Grid, Typography } from "@mui/material";
import { Player } from "src/models/Player";
import { Colors } from "src/style/Colors";

import PersonIcon from "@mui/icons-material/Person";
import { isInt } from "src/utils/calcul";
import { useTranslation } from "react-i18next";

interface Props {
  label: string;
  value: number;
  max?: number;
  min?: number;
}

export const CardStats = ({ label, value, max, min }: Props) => {
  const { t } = useTranslation();
  return (
    <Grid container spacing={1} sx={{ textAlign: "center" }}>
      <Grid item xs={12}>
        <Typography variant="h4">{label}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h2">{value.toFixed(1)}</Typography>
      </Grid>
      {min !== undefined && (
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "center",
            alignItems: "center",
            color: Colors.red,
          }}
        >
          <Typography variant="h6">{t("commun.min")}</Typography>
          <Typography variant="body1">{min}</Typography>
        </Grid>
      )}
      {max !== undefined && (
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "center",
            alignItems: "center",
            color: Colors.green,
          }}
        >
          <Typography variant="h6">{t("commun.max")}</Typography>
          <Typography variant="body1">{max}</Typography>
        </Grid>
      )}
    </Grid>
  );
};

interface PropsCardStatsPlayer {
  player: Player;
  label: string;
  value: number;
}

export const CardStatsPlayer = ({
  label,
  value,
  player,
}: PropsCardStatsPlayer) => (
  <Grid container spacing={1}>
    <Grid item xs={12}>
      <Typography variant="h4">{label}</Typography>
    </Grid>
    <Grid item xs={12} sx={{ display: "flex", gap: 2 }}>
      <Avatar sx={{ width: 50, height: 50 }}>
        <PersonIcon fontSize="large" />
      </Avatar>
      <Box>
        <Typography variant="body1">{`${player.firstname} ${player.lastname}`}</Typography>
        <Typography variant="h2">{value}</Typography>
      </Box>
    </Grid>
  </Grid>
);

interface Value {
  tente: number;
  marque: number;
  percent: number;
}

interface PropsCardStatsLF {
  label: string;
  value: Value;
  max?: Value;
  min?: Value;
}

export const CardStatsLF = ({ label, value, max, min }: PropsCardStatsLF) => {
  const { t } = useTranslation();
  return (
    <Grid container spacing={1} sx={{ textAlign: "center" }}>
      <Grid item xs={12}>
        <Typography variant="h4">{label}</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h2">
          {((value.marque / value.tente) * 100).toFixed(1)}
        </Typography>
        <Typography variant="h6">
          ({isInt(value.marque) ? value.marque : value.marque.toFixed(1)}/
          {isInt(value.tente) ? value.tente : value.tente.toFixed(1)})
        </Typography>
      </Grid>
      {min !== undefined && (
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "center",
            alignItems: "center",
            color: Colors.red,
          }}
        >
          <Typography variant="h6">{t("commun.min")}</Typography>
          <Typography variant="body1">
            {min.percent.toFixed(1)} ({min.marque}/{min.tente})
          </Typography>
        </Grid>
      )}
      {max !== undefined && (
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "center",
            alignItems: "center",
            color: Colors.green,
          }}
        >
          <Typography variant="h6">{t("commun.max")}</Typography>
          <Typography variant="body1">
            {max.percent.toFixed(1)} ({max.marque}/{max.tente})
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};
