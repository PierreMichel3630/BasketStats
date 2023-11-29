import { Grid, Paper, Typography } from "@mui/material";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Game } from "src/models/Game";
import { sortByDateDesc } from "src/utils/sort";

interface PropsBlock {
  games: Array<Game>;
}
export const LastGameBlock = ({ games }: PropsBlock) => {
  const { t } = useTranslation();
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
          <Typography variant="h4">{t("commun.lastgame")}</Typography>
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
            <Typography variant="h6">{t("commun.notspecified")}</Typography>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export const NextGameBlock = ({ games }: PropsBlock) => {
  const { t } = useTranslation();
  const game = games
    .filter((el) => moment(el.date).isAfter(moment()))
    .sort(sortByDateDesc)[0];

  return (
    <Paper sx={{ p: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4">{t("commun.lastgame")}</Typography>
        </Grid>
        {game ? (
          <>
            <Grid item xs={12}>
              <Typography variant="body1">
                {`${game.is_outside ? t("commun.in") : t("commun.against")} ${
                  game.opponent
                }`}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                {t("commun.during", {
                  date: moment(game.date).format("dddd DD MMMM YYYY à HH:mm"),
                })}
              </Typography>
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1">{t("commun.notspecified")}</Typography>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};
