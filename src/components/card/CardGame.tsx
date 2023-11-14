import { Grid, Paper, Typography } from "@mui/material";
import moment from "moment";
import { Game } from "src/models/Game";
import { sortByDateDesc } from "src/utils/sort";

interface PropsBlock {
  games: Array<Game>;
}
export const LastGameBlock = ({ games }: PropsBlock) => {
  const game = games
    .filter((el) => el.team_score !== null && el.opponent_score !== null)
    .sort(sortByDateDesc)[0];

  const isWin =
    game &&
    game.team_score !== null &&
    game.opponent_score !== null &&
    game.team_score > game.opponent_score;

  return (
    <Paper sx={{ p: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4">Dernier Match</Typography>
        </Grid>
        {game ? (
          <>
            <Grid item xs={10}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: isWin ? 700 : 500,
                }}
              >
                {game.team.name}
              </Typography>
            </Grid>
            {game.team_score && (
              <Grid item xs={2}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: isWin ? 700 : 500,
                  }}
                >
                  {game.team_score}
                </Typography>
              </Grid>
            )}
            <Grid item xs={10}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: !isWin ? 700 : 500,
                }}
              >
                {game.opponent}
              </Typography>
            </Grid>
            {game.opponent_score && (
              <Grid item xs={2}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: !isWin ? 700 : 500,
                  }}
                >
                  {game.opponent_score}
                </Typography>
              </Grid>
            )}
          </>
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6">Non Renseigné</Typography>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export const NextGameBlock = ({ games }: PropsBlock) => {
  const game = games
    .filter((el) => moment(el.date).isAfter(moment()))
    .sort(sortByDateDesc)[0];

  return (
    <Paper sx={{ p: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4">Prochain Match</Typography>
        </Grid>
        {game ? (
          <>
            <Grid item xs={12}>
              <Typography variant="body1">
                {`${game.is_outside ? "à" : "contre"} ${game.opponent}`}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                le {moment(game.date).format("dddd DD MMMM YYYY à HH:mm")}
              </Typography>
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1">Non Renseigné</Typography>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};
