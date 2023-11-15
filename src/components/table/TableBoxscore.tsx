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

interface PropsStats {
  stats: Array<StatsPlayer>;
}

export const TableBoxscore = ({ stats }: PropsStats) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableBoxscoreStaterOrBench
          title="STARTER"
          stats={stats.filter((el) => el.startingfive)}
        />
        <TableBoxscoreStaterOrBench
          title="BENCH"
          stats={stats.filter((el) => !el.startingfive)}
        />
        <TableRow>
          <TableCell>
            <Typography variant="body1">TEAM</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body1" align="center">
              {stats.reduce((acc, value) => acc + (value.minutes ?? 0), 0)}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body1" align="center">
              {stats.reduce((acc, value) => acc + (value.points ?? 0), 0)}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body1" align="center">
              {stats.reduce(
                (acc, value) => acc + (value.threeptspassed ?? 0),
                0
              )}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body1" align="center">
              {stats.reduce(
                (acc, value) => acc + (value.twoptsintpassed ?? 0),
                0
              )}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body1" align="center">
              {stats.reduce(
                (acc, value) => acc + (value.twoptsextpassed ?? 0),
                0
              )}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body1" align="center">
              {stats.reduce((acc, value) => acc + (value.lfpassed ?? 0), 0)}
            </Typography>
          </TableCell>
          <TableCell align="center">
            <Typography variant="body1">
              {stats.reduce((acc, value) => acc + (value.fouls ?? 0), 0)}
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
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="h6">{title}</Typography>
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
        {stats.map((stat) => {
          return (
            <TableRow key={stat.id}>
              <TableCell>
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
                <Typography variant="body1">{stat.fouls ?? "-"}</Typography>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </>
  );
};
