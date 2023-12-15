import { Grid } from "@mui/material";
import { useContext } from "react";
import { AddStatsContext } from "src/pages/PageAddStatsGameV3";
import { sortByNumber } from "src/utils/sort";
import { CardAddStatsPlayer } from "../card/CardAddStatsPlayer";
import { CardAddStatsOpponent } from "../card/CardAddStatsTeam";

export const AddShootPlayersBlock = () => {
  const {
    game,
    players,
    statsPlayers,
    shoots,
    addShoot,
    deleteShoot,
    setStatsTeam,
    statsTeam,
  } = useContext(AddStatsContext);

  console.log(statsTeam);

  return (
    <Grid container spacing={1}>
      {statsPlayers
        .filter((el) => el.is_play)
        .sort(sortByNumber)
        .map((stat) => {
          const idPlayer = stat.player.id;
          const player = players.find((el) => el.id === idPlayer);
          const shootsPlayer = shoots.filter((el) => el.player === idPlayer);
          return (
            player &&
            game && (
              <Grid item xs={12}>
                <CardAddStatsPlayer
                  player={player}
                  stat={stat}
                  game={game}
                  shoots={shootsPlayer}
                  addShoot={addShoot}
                  deleteShoot={deleteShoot}
                />
              </Grid>
            )
          );
        })}
      {statsTeam && game && (
        <Grid item xs={12}>
          <CardAddStatsOpponent
            game={game}
            stats={statsTeam}
            setStatsTeam={setStatsTeam}
          />
        </Grid>
      )}
    </Grid>
  );
};
