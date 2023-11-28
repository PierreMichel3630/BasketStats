import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { Player } from "src/models/Player";
import { StatsPlayerAvg } from "src/models/Statistique";
import { sortByName } from "src/utils/sort";

import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Colors } from "src/style/Colors";

interface Props {
  players: Array<Player>;
}

export const TablePlayer = ({ players }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">Licence</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Nom</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.sort(sortByName).map((player) => (
            <TableRow key={player.id}>
              <TableCell>
                <Typography variant="body1">{player.licence}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">{`${player.lastname.toUpperCase()} ${
                  player.firstname
                }`}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

interface PropsStats {
  players: Array<Player>;
  stats: Array<StatsPlayerAvg>;
}

export const TablePlayerStats = ({ players, stats }: PropsStats) => {
  const navigate = useNavigate();
  const getValue = (value: null | number) =>
    value !== null ? value.toFixed(1) : "-";

  const columns: Array<GridColDef> = [
    {
      headerName: "Nom",
      field: "name",
      headerAlign: "left",
      align: "left",
      width: 180,
    },
    {
      headerName: "MJ",
      field: "mj",
      headerAlign: "center",
      align: "center",
      type: "number",
      flex: 1,
      minWidth: 40,
    },
    {
      headerName: "MIN",
      field: "min",
      headerAlign: "center",
      align: "center",
      type: "number",
      flex: 1,
      minWidth: 50,
    },
    {
      headerName: "PTS",
      field: "pts",
      headerAlign: "center",
      align: "center",
      type: "number",
      flex: 1,
      minWidth: 50,
    },
    {
      headerName: "3PTS",
      field: "threepts",
      headerAlign: "center",
      align: "center",
      type: "number",
      flex: 1,
      minWidth: 60,
    },
    {
      headerName: "2PTS Int",
      field: "twoptsint",
      headerAlign: "center",
      align: "center",
      type: "number",
      flex: 1,
      minWidth: 80,
    },
    {
      headerName: "2PTS Ext",
      field: "twoptsext",
      headerAlign: "center",
      align: "center",
      type: "number",
      flex: 1,
      minWidth: 80,
    },
    {
      headerName: "LF",
      field: "lf",
      headerAlign: "center",
      align: "center",
      type: "number",
      flex: 1,
      minWidth: 50,
    },
    {
      headerName: "PF",
      field: "pf",
      headerAlign: "center",
      align: "center",
      type: "number",
      minWidth: 50,
      flex: 1,
    },
  ];

  const rows = players.map((player) => {
    const stat = stats.find((el) => el.player.id === player.id);
    return {
      id: player.id,
      licence: player.licence,
      name: `${player.lastname.toUpperCase()} ${player.firstname}`,
      mj: stat ? stat.games ?? 0 : 0,
      min: stat ? getValue(stat.minutes) : "-",
      pts: stat ? getValue(stat.points) : "-",
      threepts: stat ? getValue(stat.threeptspassed) : "-",
      twoptsint: stat ? getValue(stat.twoptsintpassed) : "-",
      twoptsext: stat ? getValue(stat.twoptsextpassed) : "-",
      lf: stat ? getValue(stat.lfpassed) : "-",
      pf: stat ? getValue(stat.fouls) : "-",
    };
  });

  const onRowClick: GridEventListener<"rowClick"> = (params) => {
    navigate(`/player/${params.id}`);
  };

  return (
    <Grid container>
      <Grid item xs={12} sx={{ bgcolor: "primary.main", p: 1 }}>
        <Typography variant="h4" color="white">
          EFFECTIF
        </Typography>
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
          onRowClick={onRowClick}
          hideFooter
          disableRowSelectionOnClick
          disableColumnMenu
          initialState={{
            sorting: {
              sortModel: [{ field: "pts", sort: "desc" }],
            },
          }}
        />
      </Grid>
    </Grid>
  );
};
