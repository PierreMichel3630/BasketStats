import { Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { StatsPlayerAvg } from "src/models/Statistique";
import { Colors } from "src/style/Colors";

interface Props {
  stats: Array<StatsPlayerAvg>;
}

export const TableSeasonPlayer = ({ stats }: Props) => {
  const getValue = (value: null | number) =>
    value !== null ? value.toFixed(1) : "-";

  const columns: Array<GridColDef> = [
    {
      headerName: "Club",
      field: "club",
      headerAlign: "left",
      align: "left",
      width: 180,
    },
    {
      headerName: "Équipe",
      field: "team",
      headerAlign: "left",
      align: "left",
      width: 180,
    },
    {
      headerName: "M",
      field: "games",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      headerName: "MIN",
      field: "min",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      headerName: "PTS",
      field: "pts",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      headerName: "3PTS",
      field: "threepts",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      headerName: "2PTS Int",
      field: "twoptsint",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      headerName: "2PTS Ext",
      field: "twoptsext",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      headerName: "LF",
      field: "lf",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      headerName: "PF",
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
    <Grid container>
      <Grid item xs={12} sx={{ bgcolor: "primary.main", p: 1 }}>
        <Typography variant="h4" color="white">
          STATISTIQUES DE CARRIERE
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
  );
};
