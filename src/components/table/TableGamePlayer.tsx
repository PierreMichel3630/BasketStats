import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { StatsPlayer } from "src/models/Statistique";
import { Colors } from "src/style/Colors";
import { getFouls } from "src/utils/calcul";
import { sortByGameDateDesc } from "src/utils/sort";

interface Props {
  stats: Array<StatsPlayer>;
  number?: number;
  title?: string;
}

export const TableGamePlayer = ({
  stats,
  number,
  title = "JOURNAL DE MATCHS",
}: Props) => {
  const navigate = useNavigate();
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
    id: stat.game.id,
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

  const rowsDisplay = number ? rows.splice(0, 5) : rows;

  const onRowClick: GridEventListener<"rowClick"> = (params) => {
    navigate(`/game/${params.id}/stats`);
  };

  return (
    <Grid container>
      <Grid item xs={12} sx={{ bgcolor: "primary.main", p: 1 }}>
        <Typography variant="h4" color="white">
          {title}
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
            ".MuiDataGrid-row": {
              cursor: "pointer",
            },
          }}
          sortingOrder={["desc", "asc"]}
          rowHeight={35}
          rows={rowsDisplay}
          columns={columns}
          onRowClick={onRowClick}
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

const hoverCell = {
  color: "inherit",
};

interface PropsLast5 {
  stats: Array<StatsPlayer>;
}

export const TableLast5GamePlayer = ({ stats }: PropsLast5) => {
  const getValue = (value: null | number) => (value !== null ? value : "-");

  const rows = [...stats]
    .sort(sortByGameDateDesc)
    .splice(0, 5)
    .map((stat) => ({
      id: stat.game.id,
      date: moment(stat.game.date).format("DD/MM/YYYY"),
      opponent: stat.game.opponent,
      min: stat.minutes,
      pts: stat.points,
      threepts: stat.threeptspassed,
      twoptsint: stat.twoptsintpassed,
      twoptsext: stat.twoptsextpassed,
      lf: stat.lfpassed,
      pf: getFouls(stat),
    }));

  const totalMin = rows.reduce((acc, value) => acc + (value.min ?? 0), 0);
  const totalPts = rows.reduce((acc, value) => acc + (value.pts ?? 0), 0);
  const totalThreepts = rows.reduce(
    (acc, value) => acc + (value.threepts ?? 0),
    0
  );
  const totalTwoptsint = rows.reduce(
    (acc, value) => acc + (value.twoptsint ?? 0),
    0
  );
  const totalTwoptsext = rows.reduce(
    (acc, value) => acc + (value.twoptsext ?? 0),
    0
  );
  const totalLf = rows.reduce((acc, value) => acc + (value.lf ?? 0), 0);
  const totalPf = rows.reduce((acc, value) => acc + (value.pf ?? 0), 0);

  return (
    <Grid container>
      <Grid item xs={12} sx={{ bgcolor: "primary.main", p: 1 }}>
        <Typography variant="h4" color="white">
          5 DERNIERS MATCHS
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TableContainer>
          <Table size="small">
            <TableHead sx={{ bgcolor: Colors.subprimary }}>
              <TableRow>
                <TableCell>
                  <Typography variant="h6" color="white">
                    Date
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" color="white">
                    Adversaire
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" color="white">
                    MIN
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" color="white">
                    PTS
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" color="white">
                    3PTS
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" color="white">
                    2PTS Int
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" color="white">
                    2PTS Ext
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" color="white">
                    LF
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" color="white">
                    PF
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  component={Link}
                  key={row.id}
                  sx={{
                    "&:hover": {
                      bgcolor: "secondary.main",
                      cursor: "pointer",
                      color: Colors.black,
                    },
                  }}
                  to={`/game/${row.id}/stats`}
                >
                  <TableCell sx={hoverCell}>
                    <Typography variant="body2">{row.date}</Typography>
                  </TableCell>
                  <TableCell sx={hoverCell}>
                    <Typography variant="body2">{row.opponent}</Typography>
                  </TableCell>
                  <TableCell sx={hoverCell} align="center">
                    <Typography variant="body2">{getValue(row.min)}</Typography>
                  </TableCell>
                  <TableCell sx={hoverCell} align="center">
                    <Typography variant="body2">{getValue(row.pts)}</Typography>
                  </TableCell>
                  <TableCell sx={hoverCell} align="center">
                    <Typography variant="body2">
                      {getValue(row.threepts)}
                    </Typography>
                  </TableCell>
                  <TableCell sx={hoverCell} align="center">
                    <Typography variant="body2">
                      {getValue(row.twoptsint)}
                    </Typography>
                  </TableCell>
                  <TableCell sx={hoverCell} align="center">
                    <Typography variant="body2">
                      {getValue(row.twoptsext)}
                    </Typography>
                  </TableCell>
                  <TableCell sx={hoverCell} align="center">
                    <Typography variant="body2">{getValue(row.lf)}</Typography>
                  </TableCell>
                  <TableCell sx={hoverCell} align="center">
                    <Typography variant="body2">{row.pf}</Typography>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow sx={{ bgcolor: Colors.subprimary2 }}>
                <TableCell colSpan={9}>
                  <Typography variant="h6" color="white">
                    Moyenne
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={hoverCell} align="center"></TableCell>
                <TableCell sx={hoverCell} align="center"></TableCell>
                <TableCell sx={hoverCell} align="center">
                  <Typography variant="h6">
                    {totalMin === 0 ? "-" : (totalMin / rows.length).toFixed(1)}
                  </Typography>
                </TableCell>
                <TableCell sx={hoverCell} align="center">
                  <Typography variant="h6">
                    {(totalPts / rows.length).toFixed(1)}
                  </Typography>
                </TableCell>
                <TableCell sx={hoverCell} align="center">
                  <Typography variant="h6">
                    {(totalThreepts / rows.length).toFixed(1)}
                  </Typography>
                </TableCell>
                <TableCell sx={hoverCell} align="center">
                  <Typography variant="h6">
                    {(totalTwoptsint / rows.length).toFixed(1)}
                  </Typography>
                </TableCell>
                <TableCell sx={hoverCell} align="center">
                  <Typography variant="h6">
                    {(totalTwoptsext / rows.length).toFixed(1)}
                  </Typography>
                </TableCell>
                <TableCell sx={hoverCell} align="center">
                  <Typography variant="h6">
                    {(totalLf / rows.length).toFixed(1)}
                  </Typography>
                </TableCell>
                <TableCell sx={hoverCell} align="center">
                  <Typography variant="h6">
                    {(totalPf / rows.length).toFixed(1)}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow sx={{ bgcolor: Colors.subprimary2 }}>
                <TableCell colSpan={9}>
                  <Typography variant="h6" color="white">
                    Total
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={hoverCell}></TableCell>
                <TableCell sx={hoverCell}></TableCell>
                <TableCell sx={hoverCell} align="center">
                  <Typography variant="h6">
                    {totalMin === 0 ? "-" : totalMin}
                  </Typography>
                </TableCell>
                <TableCell sx={hoverCell} align="center">
                  <Typography variant="h6">{totalPts}</Typography>
                </TableCell>
                <TableCell sx={hoverCell} align="center">
                  <Typography variant="h6">{totalThreepts}</Typography>
                </TableCell>
                <TableCell sx={hoverCell} align="center">
                  <Typography variant="h6">{totalTwoptsint}</Typography>
                </TableCell>
                <TableCell sx={hoverCell} align="center">
                  <Typography variant="h6">{totalTwoptsext}</Typography>
                </TableCell>
                <TableCell sx={hoverCell} align="center">
                  <Typography variant="h6">{totalLf}</Typography>
                </TableCell>
                <TableCell sx={hoverCell} align="center">
                  <Typography variant="h6">{totalPf}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
