import { Box, Grid, Typography } from "@mui/material";
import { px } from "csx";
import { useTranslation } from "react-i18next";
import { Colors } from "src/style/Colors";

export const ShootHeaderQTBlock = () => {
  const { t } = useTranslation();
  return (
    <Grid container columnSpacing={{ xs: 3 }} justifyContent="center">
      <Grid
        item
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box sx={{ bgcolor: Colors.red, width: px(10), height: px(10) }} />
        <Typography variant="h6" sx={{ color: Colors.red }}>
          {t("commun.quartertime1")}
        </Typography>
      </Grid>
      <Grid
        item
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box
          sx={{
            bgcolor: Colors.green,
            width: px(10),
            height: px(10),
          }}
        />
        <Typography variant="h6" sx={{ color: Colors.green }}>
          {t("commun.quartertime2")}
        </Typography>
      </Grid>
      <Grid
        item
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box sx={{ bgcolor: Colors.blue, width: px(10), height: px(10) }} />
        <Typography variant="h6" sx={{ color: Colors.blue }}>
          {t("commun.quartertime3")}
        </Typography>
      </Grid>
      <Grid
        item
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box
          sx={{
            bgcolor: Colors.orange,
            width: px(10),
            height: px(10),
          }}
        />
        <Typography variant="h6" sx={{ color: Colors.orange }}>
          {t("commun.quartertime4")}
        </Typography>
      </Grid>
      <Grid
        item
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box
          sx={{
            bgcolor: Colors.yellow,
            width: px(10),
            height: px(10),
          }}
        />
        <Typography variant="h6" sx={{ color: Colors.yellow }}>
          {t("commun.prolongation")}
        </Typography>
      </Grid>
    </Grid>
  );
};
