import {
  Box,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid, GridActionsCellItem, GridRowParams } from "@mui/x-data-grid";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { Game } from "src/models/Game";
import { Colors } from "src/style/Colors";

import AddchartIcon from "@mui/icons-material/Addchart";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { groupBy } from "lodash";
import { sortByDateDesc } from "src/utils/sort";

interface Props {
  games: Array<Game>;
}

export const TableGame = ({ games }: Props) => {
  const gamesSort = games.sort(sortByDateDesc);
  const gamesGroupByMonth = groupBy(gamesSort, (el) =>
    moment(el.date).format("MMMM")
  );
  return (
    <Paper
      elevation={3}
      variant="outlined"
      sx={{ bgcolor: "background.paper" }}
    >
      <Grid container>
        <Grid item xs={12} sx={{ bgcolor: "primary.main", p: 1 }}>
          <Typography variant="h4" color="white">
            CALENDRIER DE L'ÉQUIPE
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TableContainer>
            <Table size="small">
              <TableHead sx={{ bgcolor: Colors.subprimary }}>
                <TableRow>
                  <TableCell>
                    <Typography variant="h4">Date</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h4">Opponent</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h4">Result</Typography>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(gamesGroupByMonth).map(([key, value]) => (
                  <>
                    <TableRow sx={{ bgcolor: Colors.subprimary2 }}>
                      <TableCell colSpan={4}>
                        <Typography variant="h6">{key}</Typography>
                      </TableCell>
                    </TableRow>
                    {value.map((game) => (
                      <TableRow key={game.id}>
                        <TableCell>
                          <Typography variant="body1">
                            {moment(game.date).format("DD/MM/YYYY")}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1">
                            {`${game.is_outside ? "à" : "contre"} ${
                              game.opponent
                            }`}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {game.opponent_score && game.team_score ? (
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <Typography
                                variant="h4"
                                sx={{
                                  color:
                                    game.team_score > game.opponent_score
                                      ? Colors.green
                                      : Colors.red,
                                }}
                              >
                                {game.team_score > game.opponent_score
                                  ? "V"
                                  : "D"}
                              </Typography>
                              <Typography variant="body1">{`${game.team_score} - ${game.opponent_score}`}</Typography>
                            </Box>
                          ) : (
                            <Typography variant="body1">
                              Non renseigné
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell sx={{ display: "flex", gap: 2 }}>
                          <Link to={`/game/${game.id}/addstats`}>
                            <Tooltip title="Ajouter / Modifier les statistiques">
                              <IconButton size="small">
                                <AddchartIcon />
                              </IconButton>
                            </Tooltip>
                          </Link>
                          <Link to={`/game/${game.id}/stats`}>
                            <Tooltip title="Voir les statistiques">
                              <IconButton>
                                <QueryStatsIcon />
                              </IconButton>
                            </Tooltip>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
};

export const TableGameEdit = ({ games }: Props) => {
  const navigate = useNavigate();

  const columns = [
    { field: "date", headerName: "Date", flex: 1 },
    { field: "opponent", headerName: "Adversaire", flex: 2 },
    { field: "score", headerName: "Score", flex: 1 },
    {
      field: "actions",
      type: "actions",
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<AddchartIcon />}
          label="AddchartIcon"
          onClick={() => navigate(`/game/${params.id}/addstats`)}
        />,
      ],
    },
  ];

  const rows: Array<any> = games.map((game) => ({
    id: game.id,
    date: moment(game.date).format("DD/MM/YYYY"),
    opponent: game.opponent,
    score:
      game.opponent_score && game.team_score
        ? `${game.team_score} - ${game.opponent_score}`
        : "Non renseigné",
  }));

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        hideFooter
        disableRowSelectionOnClick
      />
    </Box>
  );
};
