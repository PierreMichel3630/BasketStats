import { Grid, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { StatsPlayerAvg } from "src/models/Statistique";
import { Colors } from "src/style/Colors";

interface Props {
  stats: Array<StatsPlayerAvg>;
}

export const TableSeasonPlayer = ({ stats }: Props) => {
  const { t } = useTranslation();
  const getValue = (value: null | number) =>
    value !== null ? value.toFixed(1) : "-";

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
    },
    {
      headerName: t("commun.minutessabbreviation"),
      field: "min",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      headerName: t("commun.pointsabbreviation"),
      field: "pts",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      headerName: t("commun.threepointsabbreviation"),
      field: "threepts",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      headerName: t("commun.twopointsintabbreviation"),
      field: "twoptsint",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      headerName: t("commun.twopointsextabbreviation"),
      field: "twoptsext",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      headerName: t("commun.ftabbreviation"),
      field: "lf",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      headerName: t("commun.foulsabbreviation"),
      field: "pf",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
  ];

  const rows = stats.map((stat, index) => ({
    id: index,
    club: stat.team.club,
    team: stat.team.name,
    games: stat.games,
    min: getValue(stat.minutes),
    pts: getValue(stat.points),
    threepts: getValue(stat.threeptspassed),
    twoptsint: getValue(stat.twoptsintpassed),
    twoptsext: getValue(stat.twoptsextpassed),
    lf: getValue(stat.lfpassed),
    pf: getValue(stat.fouls),
  }));

  return (
    <Paper
      variant="outlined"
      sx={{ width: "100%", bgcolor: "background.paper" }}
    >
      <Grid container>
        <Grid item xs={12} sx={{ bgcolor: "primary.main", p: 1 }}>
          <Typography variant="h4" color="white" textTransform="uppercase">
            {t("commun.careerstatistics")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            sx={{
              ".MuiButtonBase-root": {
                color: "white",
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
