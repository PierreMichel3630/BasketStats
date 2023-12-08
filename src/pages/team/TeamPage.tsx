import { Alert, Button, Grid, Paper, Tab, Tabs } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { getGamesByTeamId } from "src/api/game";
import { getPlayersByEquipeId } from "src/api/player";
import { getShootByTeam, getShootInGames } from "src/api/shoot";
import {
  getStatsPlayerAvgByTeamId,
  getStatsTeamByTeamId,
} from "src/api/statistique";

import { getTeamById } from "src/api/team";
import { CircularLoading } from "src/components/Loading";
import { MessageSnackbar } from "src/components/Snackbar";
import { CreateGameDialog } from "src/components/dialog/CreateGameDialog";
import { HeaderTeam } from "src/components/header/HeaderTeam";
import { GoHomeButton } from "src/components/navigation/GoBackButton";
import { useAuth } from "src/context/AuthProviderSupabase";
import { Game } from "src/models/Game";
import { Player } from "src/models/Player";
import { RightTeam } from "src/models/Right";
import { Shoot } from "src/models/Shoot";
import { StatsPlayerAvg, StatsTeam } from "src/models/Statistique";
import { Team } from "src/models/Team";

export const TeamContext = createContext<{
  team: Team | undefined;
  games: Array<Game>;
  setGames: (value: Array<Game>) => void;
  players: Array<Player>;
  setPlayers: (value: Array<Player>) => void;
  statsPlayer: Array<StatsPlayerAvg>;
  statsTeam: Array<StatsTeam>;
  rightTeam: RightTeam | undefined;
  shoots: Array<Shoot>;
}>({
  team: undefined,
  games: [],
  setGames: (value: Array<Game>) => {},
  players: [],
  setPlayers: (value: Array<Player>) => {},
  statsPlayer: [],
  statsTeam: [],
  rightTeam: undefined,
  shoots: [],
});

export const TeamPage = () => {
  const { id } = useParams();
  const { user, rightTeam } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const myRightTeam = rightTeam.find((el) => el.team.toString() === id);

  const [isLoadingGame, setIsLoadingGame] = useState(true);
  const [isLoadingPlayer, setIsLoadingPlayer] = useState(true);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [open, setOpen] = useState(false);
  const [team, setTeam] = useState<undefined | Team>(undefined);
  const [games, setGames] = useState<Array<Game>>([]);
  const [players, setPlayers] = useState<Array<Player>>([]);
  const [shoots, setShoots] = useState<Array<Shoot>>([]);
  const [statsPlayer, setStatsPlayer] = useState<Array<StatsPlayerAvg>>([]);
  const [statsTeam, setStatsTeam] = useState<Array<StatsTeam>>([]);
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState<string>(location.pathname.split("/").pop()!);

  const tabs = [
    { label: "Home", value: "home", url: "home" },
    { label: "Matchs", value: "games", url: "games" },
    { label: "Joueurs", value: "players", url: "players" },
    { label: "Statistiques", value: "stats", url: "stats" },
    { label: "Tirs", value: "shoots", url: "shoots" },
    { label: "Comparer", value: "compare", url: "compare" },
  ];

  useEffect(() => {
    setTab(location.pathname.split("/").pop()!);
  }, [location.pathname]);

  const getTeam = () => {
    if (id) {
      getTeamById(id).then((res) => {
        setTeam(res.data as Team);
      });
    }
  };
  const getGames = () => {
    if (id) {
      getGamesByTeamId(id).then((res) => {
        setGames(res.data as Array<Game>);
        setIsLoadingGame(false);
      });
    }
  };

  const getPlayers = () => {
    if (id) {
      getPlayersByEquipeId(id).then((res) => {
        const data = res.data;
        setPlayers(
          data && data.length > 0
            ? (data.map((el) => el.player) as Array<Player>)
            : []
        );
        setIsLoadingPlayer(false);
      });
    }
  };

  const getStatsPlayer = () => {
    if (id) {
      getStatsPlayerAvgByTeamId(Number(id)).then((res) => {
        setStatsPlayer(res.data as Array<StatsPlayerAvg>);
      });
    }
  };

  const getStatsTeam = () => {
    if (id) {
      getStatsTeamByTeamId(Number(id)).then((res) => {
        setStatsTeam(res.data as Array<StatsTeam>);
        setIsLoadingStats(false);
      });
    }
  };

  useEffect(() => {
    setIsLoadingGame(true);
    setIsLoadingPlayer(true);
    setIsLoadingStats(true);
    getTeam();
    getGames();
    getPlayers();
    getStatsPlayer();
    getStatsTeam();
  }, [id]);

  const getShoots = () => {
    if (games.length > 0) {
      const ids = games.map((el) => el.id);
      getShootInGames(ids).then((res) => {
        setShoots(res.data as Array<Shoot>);
      });
    } else {
      setShoots([]);
    }
  };

  useEffect(() => {
    getShoots();
  }, [games]);

  const handleChangeTab = (_: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const addGame = () => {
    if (user) {
      if (myRightTeam) {
        setOpen(true);
      } else {
        setMessage(t("commun.errorrightteam"));
      }
    } else {
      navigate("/login");
    }
  };

  const isLoading = isLoadingGame || isLoadingPlayer || isLoadingStats;

  return (
    <TeamContext.Provider
      value={{
        team,
        games,
        setGames,
        players,
        setPlayers,
        statsPlayer,
        rightTeam: myRightTeam,
        statsTeam,
        shoots,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <GoHomeButton />
        </Grid>
        {team && (
          <Grid item xs={12}>
            <Paper
              variant="outlined"
              sx={{ width: "100%", bgcolor: "background.paper", p: 1 }}
            >
              <HeaderTeam team={team} games={games} />
            </Paper>
          </Grid>
        )}
        {isLoading ? (
          <Grid item xs={12}>
            <CircularLoading />
          </Grid>
        ) : (
          <>
            {games.length > 0 ? (
              <>
                <Grid item xs={12}>
                  <Paper
                    variant="outlined"
                    sx={{
                      width: "100%",
                      bgcolor: "background.paper",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Tabs
                      value={tab}
                      onChange={handleChangeTab}
                      variant="scrollable"
                      scrollButtons="auto"
                      allowScrollButtonsMobile
                      indicatorColor="secondary"
                      textColor="secondary"
                    >
                      {tabs.map((el) => (
                        <Tab
                          key={el.value}
                          value={el.value}
                          component={Link}
                          label={el.label}
                          to={el.url}
                          aria-label={el.label}
                        />
                      ))}
                    </Tabs>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Outlet />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12}>
                  <Alert severity="info">{t("alert.nogame")}</Alert>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    disableElevation
                    fullWidth
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => addGame()}
                  >
                    {t("commun.addgame")}
                  </Button>
                </Grid>
                <CreateGameDialog
                  open={open}
                  close={() => {
                    setOpen(false);
                    getGames();
                  }}
                  teamId={Number(id)}
                />
                <MessageSnackbar
                  open={message !== ""}
                  handleClose={() => setMessage("")}
                  message={message}
                  severity="error"
                />
              </>
            )}
          </>
        )}
      </Grid>
    </TeamContext.Provider>
  );
};
