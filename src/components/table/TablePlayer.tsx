import {
  Alert,
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
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Colors } from "src/style/Colors";

interface Props {
  players: Array<Player>;
}

export const TablePlayer = ({ players }: Props) => {
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">{t("commun.licence")}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">{t("commun.lastname")}</Typography>
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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const getValue = (value: null | number) =>
    value !== null ? value.toFixed(1) : "-";

  const columns: Array<GridColDef> = [
    {
      headerName: t("commun.lastname"),
      field: "name",
      headerAlign: "left",
      align: "left",
      width: 180,
    },
    {
      headerName: t("commun.gameplayabbreviation"),
      field: "mj",
      headerAlign: "center",
      align: "center",
      type: "number",
      flex: 1,
      minWidth: 40,
    },
    {
      headerName: t("commun.minutessabbreviation"),
      field: "min",
      headerAlign: "center",
      align: "center",
      type: "number",
      flex: 1,
      minWidth: 50,
    },
    {
      headerName: t("commun.pointsabbreviation"),
      field: "pts",
      headerAlign: "center",
      align: "center",
      type: "number",
      flex: 1,
      minWidth: 50,
    },
    {
      headerName: t("commun.threepointsabbreviation"),
      field: "threepts",
      headerAlign: "center",
      align: "center",
      type: "number",
      flex: 1,
      minWidth: 60,
    },
    {
      headerName: t("commun.twopointsintabbreviation"),
      field: "twoptsint",
      headerAlign: "center",
      align: "center",
      type: "number",
      flex: 1,
      minWidth: 80,
    },
    {
      headerName: t("commun.twopointsextabbreviation"),
      field: "twoptsext",
      headerAlign: "center",
      align: "center",
      type: "number",
      flex: 1,
      minWidth: 80,
    },
    {
      headerName: t("commun.ftabbreviation"),
      field: "lf",
      headerAlign: "center",
      align: "center",
      type: "number",
      flex: 1,
      minWidth: 50,
    },
    {
      headerName: t("commun.foulsabbreviation"),
      field: "pf",
      headerAlign: "center",
      align: "center",
      type: "number",
      flex: 1,
      minWidth: 80,
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
        <Typography variant="h4" color="white" textTransform="uppercase">
          {t("commun.teamsize")}
        </Typography>
      </Grid>
      {rows.length > 0 ? (
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
      ) : (
        <Grid item xs={12}>
          <Alert severity="warning" sx={{ m: 2 }}>
            {t("commun.noplayer")}
          </Alert>
        </Grid>
      )}
    </Grid>
  );
};
