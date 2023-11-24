import { Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { StatsPlayer } from "src/models/Statistique";
import { Colors } from "src/style/Colors";
import { getFouls } from "src/utils/calcul";

interface Props {
  stats: Array<StatsPlayer>;
}

export const TableGamePlayer = ({ stats }: Props) => {
  const getValue = (value: null | number) => (value !== null ? value : "-");

  const columns: Array<GridColDef> = [
    {
      headerName: "Date",
      field: "date",
      type: "date",
      headerAlign: "left",
      align: "left",
      width: 85,
    },
    {
      headerName: "Adversaire",
      field: "opponent",
      headerAlign: "left",
      align: "left",
      width: 180,
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

  const rows = stats.map((stat) => ({
    id: stat.id,
    date: moment(stat.game.date).toDate(),
    opponent: stat.game.opponent,
    min: getValue(stat.minutes),
    pts: getValue(stat.points),
    threepts: getValue(stat.threeptspassed),
    twoptsint: getValue(stat.twoptsintpassed),
    twoptsext: getValue(stat.twoptsextpassed),
    lf: getValue(stat.lfpassed),
    pf: getFouls(stat),
  }));

  return (
    <Grid container>
      <Grid item xs={12} sx={{ bgcolor: "primary.main", p: 1 }}>
        <Typography variant="h4" color="white">
          JOURNAL DE MATCHS
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
