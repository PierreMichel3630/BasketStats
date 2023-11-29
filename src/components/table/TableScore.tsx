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
import { StatsTeam } from "src/models/Statistique";

interface Props {
  stats: StatsTeam;
}

export const TableScore = ({ stats }: Props) => {
  const { t } = useTranslation();
  const isWin = (value1: number | null, value2: number | null) =>
    (value1 ?? 0) > (value2 ?? 0);

  const totTeam =
    (stats.q1team ?? 0) +
    (stats.q2team ?? 0) +
    (stats.q3team ?? 0) +
    (stats.q4team ?? 0);

  const totOpponent =
    (stats.q1opponent ?? 0) +
    (stats.q2opponent ?? 0) +
    (stats.q3opponent ?? 0) +
    (stats.q4opponent ?? 0);

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
            <TableCell align="center">
              <Typography variant="h4">
                {t("commun.totalabbreviation")}
              </Typography>
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
            <TableCell align="center">
              <Typography variant={totTeam > totOpponent ? "h4" : "body1"}>
                {totTeam}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ maxWidth: px(80) }}>
              <Typography
                variant={totOpponent > totTeam ? "h4" : "body1"}
                noWrap
              >
                {stats.game.opponent}
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
            <TableCell align="center">
              <Typography variant={totOpponent > totTeam ? "h4" : "body1"}>
                {totOpponent}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
