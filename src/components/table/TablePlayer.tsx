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

import { Player } from "src/models/Player";
import { sortByName } from "src/utils/sort";

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
              <Typography variant="h4">Licence</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h4">Nom</Typography>
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
