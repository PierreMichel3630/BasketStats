import { Grid, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { padding, px } from "csx";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StatsPlayerAvg } from "src/models/Statistique";
import { Colors } from "src/style/Colors";
import { ToogleButtonTotal } from "../ToogleButton";

interface Props {
  stats: Array<StatsPlayerAvg>;
}

export const TableSeasonPlayer = ({ stats }: Props) => {
  const { t } = useTranslation();
  const [type, setType] = useState("pergame");
  const isTypeMoy = type === "pergame";

  const getValue = (games: null | number, value: null | number) =>
    games !== null && value !== null
      ? isTypeMoy
        ? value.toFixed(1)
        : value * games
      : "-";

  const columns: Array<GridColDef> = [
    {
      headerName: t("commun.club"),
      field: "club",
      headerAlign: "left",
      align: "left",
      width: 180,
    },
    {
      headerName: t("commun.team"),
      field: "team",
      headerAlign: "left",
      align: "left",
      width: 180,
    },
    {
      headerName: t("commun.gameplayabbreviation"),
      field: "games",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 50,
    },
    {
      headerName: t("commun.minutessabbreviation"),
      field: "min",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 50,
    },
    {
      headerName: t("commun.pointsabbreviation"),
      field: "pts",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 50,
    },
    {
      headerName: t("commun.threepointsabbreviation"),
      field: "threepts",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 60,
    },
    {
      headerName: t("commun.twopointsintabbreviation"),
      field: "twoptsint",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 80,
    },
    {
      headerName: t("commun.twopointsextabbreviation"),
      field: "twoptsext",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 85,
    },
    {
      headerName: t("commun.ftabbreviation"),
      field: "lf",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 50,
    },
    {
      headerName: t("commun.foulsabbreviation"),
      field: "pf",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 80,
    },
  ];

  const rows = stats.map((stat, index) => ({
    id: index,
    club: stat.team.club,
    team: stat.team.name,
    games: stat.games,
    min: getValue(stat.games, stat.minutes),
    pts: getValue(stat.games, stat.points),
    threepts: getValue(stat.games, stat.threeptspassed),
    twoptsint: getValue(stat.games, stat.twoptsintpassed),
    twoptsext: getValue(stat.games, stat.twoptsextpassed),
    lf: getValue(stat.games, stat.lfpassed),
    pf: getValue(stat.games, stat.fouls),
  }));

  return (
    <Paper
      variant="outlined"
      sx={{ width: "100%", bgcolor: "background.paper" }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            bgcolor: "primary.main",
            p: padding(px(2), px(8)),
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4" color="white" textTransform="uppercase">
            {t("commun.careerstatistics")}
          </Typography>
          <ToogleButtonTotal
            value={type}
            onChange={(value) => setType(value)}
          />
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            sx={{
              ".MuiButtonBase-root": {
                display: "none",
              },
              ".MuiDataGrid-columnSeparator": {
                display: "none",
              },
              "&.MuiDataGrid-root": {
                border: "none",
              },
              ".MuiDataGrid-columnHeader": {
                height: 20,
              },
              ".MuiDataGrid-columnHeaders": {
                backgroundColor: Colors.subprimary,
                minHeight: "inherit",
                color: "white",
              },
              ".MuiDataGrid-columnHeaderTitle": {
                fontSize: 13,
                fontWeight: 600,
                "@media (max-width:600px)": {
                  fontSize: 12,
                },
              },
              ".MuiDataGrid-row": {
                cursor: "pointer",
              },
            }}
            sortingOrder={["desc", "asc"]}
            rowHeight={35}
            rows={rows}
            columns={columns}
            hideFooter
            disableRowSelectionOnClick
            disableColumnMenu
            initialState={{
              sorting: {
                sortModel: [{ field: "date", sort: "desc" }],
              },
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};
