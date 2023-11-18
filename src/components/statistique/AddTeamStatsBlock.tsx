import { Divider, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import {
  getStatsTeamByGameId,
  insertStatsTeam,
  updateStatsTeam,
} from "src/api/statistique";
import { Game } from "src/models/Game";
import {
  StatsTeam,
  StatsTeamInsert,
  StatsTeamUpdate,
} from "src/models/Statistique";
import { AddFoulsBlockOpponent, AddFoulsBlockTeam } from "./AddFoulsBlock";
import { AddHoopBlockOpponent, AddHoopBlockTeam } from "./AddHoopBlock";
import { AddScoreStatsBlock } from "./AddScoreStatsBlock";
import { CircularLoading } from "../Loading";
import { updateGameById } from "src/api/game";

interface Props {
  game: Game;
}

export const AddTeamStatsBlock = ({ game }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<StatsTeamUpdate | null>(null);

  const getStats = () => {
    getStatsTeamByGameId(game.id).then((res) => {
      if (res.data !== null) {
        const statsTeam = res.data as StatsTeam;
        setStats({
          ...statsTeam,
          team: statsTeam.team.id,
          game: statsTeam.game.id,
        });
        setIsLoading(false);
      } else {
        const statsTeamInsert: StatsTeamInsert = {
          team: game.team.id,
          game: game.id,
          q1opponent: null,
          q2opponent: null,
          q3opponent: null,
          q4opponent: null,
          q1team: null,
          q2team: null,
          q3team: null,
          q4team: null,
          foul0lfopponent: null,
          foul1lfopponent: null,
          foul2lfopponent: null,
          foul3lfopponent: null,
          foul0lfteam: null,
          foul1lfteam: null,
          foul2lfteam: null,
          foul3lfteam: null,
          threeptsteam: null,
          twoptsextteam: null,
          twoptsintteam: null,
          lfteam: null,
          threeptsopponent: null,
          twoptsintopponent: null,
          twoptsextopponent: null,
          lfopponent: null,
        };
        insertStatsTeam(statsTeamInsert).then((res) => {
          const statsTeam = res.data as StatsTeam;
          setStats({
            ...statsTeam,
            team: statsTeam.team.id,
            game: statsTeam.game.id,
          });
          setIsLoading(false);
        });
      }
    });
  };

  useEffect(() => {
    getStats();
  }, [game]);

  const updateStats = async () => {
    if (stats) {
      await updateStatsTeam(stats);
      await updateGameById(game.id, {
        team_score:
          (stats.q1team ?? 0) +
          (stats.q2team ?? 0) +
          (stats.q3team ?? 0) +
          (stats.q4team ?? 0),
        opponent_score:
          (stats.q1opponent ?? 0) +
          (stats.q2opponent ?? 0) +
          (stats.q3opponent ?? 0) +
          (stats.q4opponent ?? 0),
      });
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      updateStats();
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [stats]);

  const onChange = (field: string, value: number) => {
    setStats((prev) => {
      if (prev !== null) {
        return { ...prev, [field]: value };
      }
      return prev;
    });
  };

  return (
    <Grid container spacing={1}>
      {isLoading || stats === null ? (
        <Grid item xs={12}>
          <CircularLoading />
        </Grid>
      ) : (
        <>
          <Grid item xs={12}>
            <AddScoreStatsBlock game={game} stats={stats} onChange={onChange} />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <AddFoulsBlockTeam game={game} stats={stats} onChange={onChange} />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <AddFoulsBlockOpponent
              game={game}
              stats={stats}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <AddHoopBlockTeam stats={stats} onChange={onChange} />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <AddHoopBlockOpponent stats={stats} onChange={onChange} />
          </Grid>
        </>
      )}
    </Grid>
  );
};
