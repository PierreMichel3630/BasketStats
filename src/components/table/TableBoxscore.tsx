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

import { StatsPlayer } from "src/models/Statistique";
import { Colors } from "src/style/Colors";

interface PropsStats {
  stats: Array<StatsPlayer>;
}

export const TableBoxscore = ({ stats }: PropsStats) => {
  const statsFilter = stats.filter((el) => el.is_play);
  return (
    <TableContainer component={Paper}>
      <Table
        size="small"
        sx={{ borderCollapse: "separate", borderSpacing: "0px 1px" }}
      >
        <TableBoxscoreStaterOrBench
          title="STARTER"
          stats={statsFilter.filter((el) => el.startingfive)}
        />
        <TableBoxscoreStaterOrBench
          title="BENCH"
          stats={statsFilter.filter((el) => !el.startingfive)}
        />
        <TableRow sx={{ bgcolor: Colors.subprimary }}>
          <TableCell
            sx={{ position: "sticky", left: 0, bgcolor: Colors.subprimary }}
          >
            <Typography variant="h4">TEAM</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h4" align="center">
              {stats.reduce((acc, value) => acc + (value.minutes ?? 0), 0)}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h4" align="center">
              {stats.reduce((acc, value) => acc + (value.points ?? 0), 0)}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h4" align="center">
              {stats.reduce(
                (acc, value) => acc + (value.threeptspassed ?? 0),
                0
              )}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h4" align="center">
              {stats.reduce(
                (acc, value) => acc + (value.twoptsintpassed ?? 0),
                0
              )}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h4" align="center">
              {stats.reduce(
                (acc, value) => acc + (value.twoptsextpassed ?? 0),
                0
              )}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h4" align="center">
              {stats.reduce((acc, value) => acc + (value.lfpassed ?? 0), 0)}
            </Typography>
          </TableCell>
          <TableCell align="center">
            <Typography variant="h4">
              {stats.reduce(
                (acc, value) =>
                  acc +
                  ((value.fouls_0lf ?? 0) +
                    (value.fouls_1lf ?? 0) +
                    (value.fouls_2lf ?? 0) +
                    (value.fouls_3lf ?? 0)),
                0
              )}
            </Typography>
          </TableCell>
        </TableRow>
      </Table>
    </TableContainer>
  );
};

interface PropsTableBoxscoreStaterOrBench {
  title: string;
  stats: Array<StatsPlayer>;
}

const TableBoxscoreStaterOrBench = ({
  stats,
  title,
}: PropsTableBoxscoreStaterOrBench) => {
  return (
    <>
      <TableHead sx={{ bgcolor: "primary.main" }}>
        <TableRow>
          <TableCell
            sx={{ position: "sticky", left: 0, bgcolor: "primary.main" }}
          >
            <Typography variant="h6">{title}</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h6" align="center" noWrap>
              MIN
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h6" align="center" noWrap>
              PTS
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h6" align="center" noWrap>
              3PTS
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h6" align="center" noWrap>
              2PTS Int
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h6" align="center" noWrap>
              2PTS Ext
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h6" align="center" noWrap>
              LF
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h6" align="center" noWrap>
              PF
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {stats.map((stat) => {
          const isfouls =
            stat.fouls_0lf !== null ||
            stat.fouls_1lf !== null ||
            stat.fouls_2lf !== null ||
            stat.fouls_3lf !== null;
          const fouls =
            (stat.fouls_0lf ?? 0) +
            (stat.fouls_1lf ?? 0) +
            (stat.fouls_2lf ?? 0) +
            (stat.fouls_3lf ?? 0);
          return (
            <TableRow key={stat.id}>
              <TableCell
                sx={{ position: "sticky", left: 0, bgcolor: Colors.subprimary }}
              >
                <Typography variant="body1">{`${stat.player.lastname.toUpperCase()} ${
                  stat.player.firstname
                }`}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" align="center">
                  {stat.minutes ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" align="center">
                  {stat.points ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" align="center">
                  {stat.threeptspassed ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" align="center">
                  {stat.twoptsintpassed ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" align="center">
                  {stat.twoptsextpassed ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" align="center">
                  {stat.lfpassed ?? "-"}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1">{isfouls ? fouls : "-"}</Typography>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </>
  );
};
