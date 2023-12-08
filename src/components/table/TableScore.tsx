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
import { px } from "csx";
import { useTranslation } from "react-i18next";
import { Game } from "src/models/Game";
import { StatsTeam } from "src/models/Statistique";
import { getPoints, getPointsOpponent } from "src/utils/calcul";

interface Props {
  stats: StatsTeam;
  game: Game;
}

export const TableScore = ({ game, stats }: Props) => {
  const { t } = useTranslation();
  const isWin = (value1: number | null, value2: number | null) =>
    (value1 ?? 0) > (value2 ?? 0);

  const totTeam = getPoints(stats);

  const totOpponent = getPointsOpponent(stats);

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="center">
              <Typography variant="h6">{t("commun.q1abbreviation")}</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6">{t("commun.q2abbreviation")}</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6">{t("commun.q3abbreviation")}</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6">{t("commun.q4abbreviation")}</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell sx={{ maxWidth: px(80) }}>
              <Typography variant={totTeam > totOpponent ? "h4" : "body1"}>
                {stats.team.abreviation}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography
                variant={isWin(stats.q1team, stats.q1opponent) ? "h4" : "body1"}
              >
                {stats.q1team}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography
                variant={isWin(stats.q2team, stats.q2opponent) ? "h4" : "body1"}
              >
                {stats.q2team}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography
                variant={isWin(stats.q3team, stats.q3opponent) ? "h4" : "body1"}
              >
                {stats.q3team}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography
                variant={isWin(stats.q4team, stats.q4opponent) ? "h4" : "body1"}
              >
                {stats.q4team}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ maxWidth: px(80) }}>
              <Typography
                variant={totOpponent > totTeam ? "h4" : "body1"}
                noWrap
              >
                {game.teamopponent.name}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography
                variant={isWin(stats.q1opponent, stats.q1team) ? "h4" : "body1"}
              >
                {stats.q1opponent}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography
                variant={isWin(stats.q2opponent, stats.q2team) ? "h4" : "body1"}
              >
                {stats.q2opponent}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography
                variant={isWin(stats.q3opponent, stats.q3team) ? "h4" : "body1"}
              >
                {stats.q3opponent}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography
                variant={isWin(stats.q4opponent, stats.q4team) ? "h4" : "body1"}
              >
                {stats.q4opponent}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
