import {
  Button,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import moment from "moment";
import { createContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { getGamesById, updateGameById } from "src/api/game";
import { getPlayersByEquipeId } from "src/api/player";
import { GoBackButton } from "src/components/navigation/GoBackButton";
import { Game, GameUpdate } from "src/models/Game";
import { Player } from "src/models/Player";

import DoneIcon from "@mui/icons-material/Done";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { getShootByGame } from "src/api/shoot";
import {
  getStatsPlayerByGameId,
  getStatsTeamByGameId,
  updateStatsPlayer,
  updateStatsTeam,
} from "src/api/statistique";
import { CardStatsSynthese } from "src/components/card/CardStatsSynthese";
import { AddShootPlayersBlock } from "src/components/statistique/AddShootPlayersBlock";
import { TableAddStatsPlayer } from "src/components/table/TableAddStatsPlayer";
import { Shoot, TimeShoot, TypeShoot } from "src/models/Shoot";
import {
  StatsPlayer,
  StatsPlayerUpdate,
  StatsTeam,
  StatsTeamUpdate,
} from "src/models/Statistique";
import {
  getNumberShoot,
  getPointPlayer,
  getPoints,
  getPointsOpponent,
} from "src/utils/calcul";

export const AddStatsContext = createContext<{
  game: Game | undefined;
  players: Array<Player>;
  statsPlayers: Array<StatsPlayer>;
  updateStatsPlayers: (value: StatsPlayer) => void;
  statsTeam: StatsTeam | undefined;
  setStatsTeam: (value: StatsTeam) => void;
  shoots: Array<Shoot>;
  addShoot: (value: Shoot) => void;
  deleteShoot: (id: number) => void;
}>({
  game: undefined,
  players: [],
  statsPlayers: [],
  updateStatsPlayers: (value: StatsPlayer) => {},
  statsTeam: undefined,
  setStatsTeam: (value: StatsTeam) => {},
  shoots: [],
  addShoot: (value: Shoot) => {},
  deleteShoot: (id: number) => {},
});

export const PageAddStatsGameV3 = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [shoots, setShoots] = useState<Array<Shoot>>([]);
  const [idStatsTeam, setIdStatsTeam] = useState<number | undefined>(undefined);
  const [game, setGame] = useState<Game | undefined>(undefined);
  const [players, setPlayers] = useState<Array<Player>>([]);
  const [statsPlayers, setStatsPlayers] = useState<Array<StatsPlayer>>([]);
  const [statsTeam, setStatsTeam] = useState<StatsTeam | undefined>(undefined);
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Fautes / Lancer-Franc", "Position de Tirs", "Synthèse"];
  const isEnd = activeStep === steps.length - 1;

  const addShoot = (value: Shoot) => {
    const newShoots = [...shoots, value];
    setShoots(newShoots);
    calculStatPlayer(value.player, newShoots);
  };

  const deleteShoot = (id: number) => {
    const newShoots = [...shoots].filter((el) => el.id !== id);
    const shootDelete = [...shoots].find((el) => el.id === id);
    setShoots(newShoots);
    if (shootDelete) {
      calculStatPlayer(shootDelete.player, newShoots);
    }
  };

  const calculStatPlayer = async (id: number, shoots: Array<Shoot>) => {
    const shootsPlayer = [...shoots].filter((el) => el.player === id);
    const statsPlayer = statsPlayers.find((el) => el.player.id === id);
    if (statsPlayer) {
      const newStat = {
        ...statsPlayer,
        game: statsPlayer.game.id,
        player: statsPlayer.player.id,
        threeptsq1: getNumberShoot(
          shootsPlayer,
          TypeShoot.threepts,
          TimeShoot.q1
        ),
        threeptsq2: getNumberShoot(
          shootsPlayer,
          TypeShoot.threepts,
          TimeShoot.q2
        ),
        threeptsq3: getNumberShoot(
          shootsPlayer,
          TypeShoot.threepts,
          TimeShoot.q3
        ),
        threeptsq4: getNumberShoot(
          shootsPlayer,
          TypeShoot.threepts,
          TimeShoot.q4
        ),
        threeptsp: getNumberShoot(
          shootsPlayer,
          TypeShoot.threepts,
          TimeShoot.p
        ),
        twoptsextq1: getNumberShoot(
          shootsPlayer,
          TypeShoot.twoptsext,
          TimeShoot.q1
        ),
        twoptsextq2: getNumberShoot(
          shootsPlayer,
          TypeShoot.twoptsext,
          TimeShoot.q2
        ),
        twoptsextq3: getNumberShoot(
          shootsPlayer,
          TypeShoot.twoptsext,
          TimeShoot.q3
        ),
        twoptsextq4: getNumberShoot(
          shootsPlayer,
          TypeShoot.twoptsext,
          TimeShoot.q4
        ),
        twoptsextp: getNumberShoot(
          shootsPlayer,
          TypeShoot.twoptsext,
          TimeShoot.p
        ),
        twoptsintq1: getNumberShoot(
          shootsPlayer,
          TypeShoot.twoptsint,
          TimeShoot.q1
        ),
        twoptsintq2: getNumberShoot(
          shootsPlayer,
          TypeShoot.twoptsint,
          TimeShoot.q2
        ),
        twoptsintq3: getNumberShoot(
          shootsPlayer,
          TypeShoot.twoptsint,
          TimeShoot.q3
        ),
        twoptsintq4: getNumberShoot(
          shootsPlayer,
          TypeShoot.twoptsint,
          TimeShoot.q4
        ),
        twoptsintp: getNumberShoot(
          shootsPlayer,
          TypeShoot.twoptsint,
          TimeShoot.p
        ),
      };
      const { data } = await updateStatsPlayer(newStat);
      if (data) {
        setStatsPlayers((prev) => [
          ...prev.filter((el) => el.id !== newStat.id),
          data as StatsPlayer,
        ]);
      }
    }
  };

  const updateStatsPlayers = async (value: StatsPlayer) => {
    const { data } = await updateStatsPlayer({
      ...value,
      game: value.game.id,
      player: value.player.id,
    });
    if (data) {
      setStatsPlayers((prev) => [
        ...prev.filter((el) => el.id !== value.id),
        data as StatsPlayer,
      ]);
    }
  };

  const getPlayers = () => {
    if (game) {
      getPlayersByEquipeId(game.team.id.toString()).then((res) => {
        if (res.data) {
          setPlayers(res.data.map((el) => el.player) as Array<Player>);
        }
      });
    }
  };

  useEffect(() => {
    getPlayers();
  }, [game]);

  const getStatsPlayers = () => {
    if (id) {
      getStatsPlayerByGameId(Number(id)).then((res) => {
        const stats = res.data as Array<StatsPlayer>;
        setStatsPlayers(stats);
      });
    }
  };

  const getGame = () => {
    if (id) {
      getGamesById(id).then((res) => {
        setGame(res.data as Game);
      });
    }
  };

  const getStatsTeam = () => {
    if (id) {
      getStatsTeamByGameId(Number(id)).then((res) => {
        const data = res.data as StatsTeam;
        setStatsTeam(data);
        setIdStatsTeam(data.id);
      });
    }
  };

  const getShoots = () => {
    if (id) {
      getShootByGame(Number(id)).then((res) => {
        setShoots(res.data as Array<Shoot>);
      });
    }
  };

  useEffect(() => {
    getGame();
    getStatsPlayers();
    getStatsTeam();
    getShoots();
  }, [id]);

  const nextStep = async () => {
    if (isEnd) {
      if (game) {
        const gameUpdate: GameUpdate = {
          opponent_score: statsTeam ? getPointsOpponent(statsTeam) : null,
          team_score: statsTeam ? getPoints(statsTeam) : null,
        };
        await updateGameById(game.id, gameUpdate);
        navigate(`/team/${game.team.id}/games`);
      }
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const updateTeam = async () => {
    if (game && idStatsTeam && statsPlayers.length > 0) {
      const players = statsPlayers.filter((el) => el.is_play);
      const foul0lfteam = players.reduce(
        (acc, value) => acc + (value.fouls_0lf ?? 0),
        0
      );
      const foul1lfteam = players.reduce(
        (acc, value) => acc + (value.fouls_1lf ?? 0),
        0
      );
      const foul2lfteam = players.reduce(
        (acc, value) => acc + (value.fouls_2lf ?? 0),
        0
      );
      const foul3lfteam = players.reduce(
        (acc, value) => acc + (value.fouls_3lf ?? 0),
        0
      );
      const q1team = players.reduce(
        (acc, value) => acc + getPointPlayer(TimeShoot.q1, value),
        0
      );
      const q2team = players.reduce(
        (acc, value) => acc + getPointPlayer(TimeShoot.q2, value),
        0
      );
      const q3team = players.reduce(
        (acc, value) => acc + getPointPlayer(TimeShoot.q3, value),
        0
      );
      const q4team = players.reduce(
        (acc, value) => acc + getPointPlayer(TimeShoot.q4, value),
        0
      );
      const threeptsteam = players.reduce(
        (acc, value) =>
          acc +
          value.threeptsq1 +
          value.threeptsq2 +
          value.threeptsq3 +
          value.threeptsq4 +
          value.threeptsp,
        0
      );
      const twoptsextteam = players.reduce(
        (acc, value) =>
          acc +
          value.twoptsextq1 +
          value.twoptsextq2 +
          value.twoptsextq3 +
          value.twoptsextq4 +
          value.twoptsextp,
        0
      );
      const twoptsintteam = players.reduce(
        (acc, value) =>
          acc +
          value.twoptsintq1 +
          value.twoptsintq2 +
          value.twoptsintq3 +
          value.twoptsintq4 +
          value.twoptsintp,
        0
      );

      const lfq1team = players.reduce((acc, value) => acc + value.q1lf, 0);
      const lfq2team = players.reduce((acc, value) => acc + value.q2lf, 0);
      const lfq3team = players.reduce((acc, value) => acc + value.q3lf, 0);
      const lfq4team = players.reduce((acc, value) => acc + value.q4lf, 0);
      const lfpteam = players.reduce((acc, value) => acc + value.plf, 0);
      const lfteam = players.reduce(
        (acc, value) =>
          acc + value.q1lf + value.q2lf + value.q3lf + value.q4lf + value.plf,
        0
      );
      const statsTeamUpdate: StatsTeamUpdate = {
        id: idStatsTeam,
        team: game.team.id,
        game: game.id,
        q1team,
        q2team,
        q3team,
        q4team,
        lfq1team,
        lfq2team,
        lfq3team,
        lfq4team,
        lfpteam,
        foul0lfteam,
        foul1lfteam,
        foul2lfteam,
        foul3lfteam,
        threeptsteam,
        twoptsextteam,
        twoptsintteam,
        lfteam,
      };
      const { data } = await updateStatsTeam(statsTeamUpdate);
      setStatsTeam(data as StatsTeam);
    }
  };

  useEffect(() => {
    updateTeam();
  }, [statsPlayers, game, idStatsTeam]);

  return (
    <AddStatsContext.Provider
      value={{
        game,
        players,
        statsPlayers,
        updateStatsPlayers,
        statsTeam,
        setStatsTeam,
        shoots,
        addShoot,
        deleteShoot,
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <GoBackButton />
        </Grid>
        <Grid item xs={12}>
          <Paper
            variant="outlined"
            sx={{ width: "100%", bgcolor: "background.paper", p: 2 }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Typography variant="h2">
                  {t("commun.enterstatistics")}
                </Typography>
                {game && (
                  <Typography variant="h4">
                    {t("commun.gameonagainst", {
                      date: moment(game.date).format("DD/MM/YYYY"),
                      opponent: game.opponent,
                    })}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label, index) => (
                    <Step key={label} onClick={() => setActiveStep(index)}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Grid>
              {game && (
                <>
                  <Grid item xs={12}>
                    {
                      {
                        0: <TableAddStatsPlayer />,
                        1: <AddShootPlayersBlock />,
                        2: <CardStatsSynthese />,
                      }[activeStep]
                    }
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      variant="contained"
                      startIcon={<SkipPreviousIcon />}
                      disabled={activeStep === 0}
                      onClick={() => setActiveStep((prev) => prev - 1)}
                    >
                      {t("commun.previous")}
                    </Button>
                    <Button
                      variant="contained"
                      endIcon={
                        activeStep === steps.length - 1 ? (
                          <DoneIcon />
                        ) : (
                          <SkipNextIcon />
                        )
                      }
                      onClick={nextStep}
                    >
                      {isEnd ? t("commun.validate") : t("commun.next")}
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </AddStatsContext.Provider>
  );
};
