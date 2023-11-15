import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { StatsTeam } from "src/models/Statistique";

interface Props {
  stats: StatsTeam;
}

export const TableScore = ({ stats }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              <Typography variant="h4">1</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h4">2</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h4">3</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h4">4</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h4">T</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography variant="body1">{stats.team.name}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">{stats.q1team}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">{stats.q2team}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">{stats.q3team}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">{stats.q4team}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">
                {(stats.q1team ?? 0) +
                  (stats.q2team ?? 0) +
                  (stats.q3team ?? 0) +
                  (stats.q4team ?? 0)}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body1">{stats.game.opponent}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">{stats.q1opponent}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">{stats.q2opponent}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">{stats.q3opponent}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">{stats.q4opponent}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">
                {(stats.q1opponent ?? 0) +
                  (stats.q2opponent ?? 0) +
                  (stats.q3opponent ?? 0) +
                  (stats.q4opponent ?? 0)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
