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
import { StatsPlayerAvg } from "src/models/Statistique";
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
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">Licence</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Nom</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" align="center">
                MJ
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" align="center">
                MIN
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" align="center">
                PTS
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" align="center">
                3PTS
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" align="center">
                2PTS Int
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" align="center">
                2PTS Ext
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" align="center">
                LF
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" align="center">
                PF
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.sort(sortByName).map((player) => {
            const stat = stats.find((el) => el.player.id === player.id);
            return (
              <TableRow key={player.id}>
                <TableCell>
                  <Typography variant="body1">{player.licence}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{`${player.lastname.toUpperCase()} ${
                    player.firstname
                  }`}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" align="center">
                    {stat ? stat.games ?? "-" : "-"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" align="center">
                    {stat ? stat.minutes ?? "-" : "-"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" align="center">
                    {stat ? stat.points ?? "-" : "-"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" align="center">
                    {stat ? stat.threeptspassed ?? "-" : "-"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" align="center">
                    {stat ? stat.twoptsintpassed ?? "-" : "-"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" align="center">
                    {stat ? stat.twoptsextpassed ?? "-" : "-"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" align="center">
                    {stat ? stat.lfpassed ?? "-" : "-"}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1">
                    {stat ? stat.fouls ?? "-" : "-"}
                  </Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
