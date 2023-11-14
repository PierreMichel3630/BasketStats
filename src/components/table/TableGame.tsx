import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { DataGrid, GridActionsCellItem, GridRowParams } from "@mui/x-data-grid";
import moment from "moment";
import { Game } from "src/models/Game";

import AddchartIcon from "@mui/icons-material/Addchart";
import { useNavigate } from "react-router-dom";
import { Colors } from "src/style/Colors";

interface Props {
  games: Array<Game>;
}

export const TableGame = ({ games }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
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
          </TableRow>
        </TableHead>
        <TableBody>
          {games.map((game) => (
            <TableRow key={game.id}>
              <TableCell>
                <Typography variant="body1">
                  {moment(game.date).format("dddd DD MMMM")}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">{game.opponent}</Typography>
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
                      {game.team_score > game.opponent_score ? "V" : "D"}
                    </Typography>
                    <Typography variant="body1">{`${game.team_score} - ${game.opponent_score}`}</Typography>
                  </Box>
                ) : (
                  <Typography variant="body1">Non renseigné</Typography>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
