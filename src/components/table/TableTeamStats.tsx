import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
} from "@mui/material";
import { Game } from "src/models/Game";
import { StatsTeam } from "src/models/Statistique";
import { getPourcentageLF } from "src/utils/calcul";

interface Props {
  stats: StatsTeam;
  game: Game;
}

export const TableTeamStats = ({ game, stats }: Props) => {
  const nbreLfTeam =
    (stats.foul1lfopponent ?? 0) * 1 +
    (stats.foul2lfopponent ?? 0) * 2 +
    (stats.foul3lfopponent ?? 0) * 3;

  const nbreLfOpponent =
    (stats.foul1lfteam ?? 0) * 1 +
    (stats.foul2lfteam ?? 0) * 2 +
    (stats.foul3lfteam ?? 0) * 3;
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              <Typography variant="h4">{game.team.name}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h4">{game.opponent}</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography variant="body1">PTS</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">{stats.game.team_score}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">
                {stats.game.opponent_score}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body1">3PTS</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">{stats.threeptsteam}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">{stats.threeptsopponent}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body1">2PTS Int.</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">{stats.twoptsintteam}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">{stats.twoptsintopponent}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body1">2PTS Ext.</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">{stats.twoptsextteam}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">{stats.twoptsextopponent}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body1">Lancer Franc</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">
                {stats.lfteam} - {nbreLfTeam}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">
                {stats.lfopponent} - {nbreLfOpponent}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body1">% Lancer Franc</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">
                {getPourcentageLF(stats.lfteam ?? 0, nbreLfTeam)}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">
                {getPourcentageLF(stats.lfopponent ?? 0, nbreLfOpponent)}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body1">Fautes</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">
                {(stats.foul0lfteam ?? 0) +
                  (stats.foul1lfteam ?? 0) +
                  (stats.foul2lfteam ?? 0) +
                  (stats.foul3lfteam ?? 0)}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">
                {(stats.foul0lfopponent ?? 0) +
                  (stats.foul1lfopponent ?? 0) +
                  (stats.foul2lfopponent ?? 0) +
                  (stats.foul3lfopponent ?? 0)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
