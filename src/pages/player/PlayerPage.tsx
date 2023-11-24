import { Grid, Paper, Tab, Tabs } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { getPlayerById } from "src/api/player";
import {
  getStatsPlayerAvgByPlayerId,
  getStatsPlayerByPlayerId,
} from "src/api/statistique";
import { getTeamByPlayerId } from "src/api/team";
import { HeaderPlayer } from "src/components/header/HeaderPlayer";
import { GoBackButton } from "src/components/navigation/GoBackButton";
import { Player } from "src/models/Player";
import { StatsPlayer, StatsPlayerAvg } from "src/models/Statistique";
import { Team } from "src/models/Team";

export const PlayerContext = createContext<{
  player: Player | undefined;
  games: Array<StatsPlayer>;
  avg: Array<StatsPlayerAvg>;
  teams: Array<Team>;
}>({
  player: undefined,
  games: [],
  avg: [],
  teams: [],
});

export const PlayerPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [player, setPlayer] = useState<Player | undefined>(undefined);
  const [statsGame, setStatsGame] = useState<Array<StatsPlayer>>([]);
  const [statsAvg, setStatsAvg] = useState<Array<StatsPlayerAvg>>([]);
  const [teams, setTeams] = useState<Array<Team>>([]);
  const [tab, setTab] = useState<string>(location.pathname.split("/").pop()!);

  const tabs = [
    { label: "Statistiques", value: "stats", url: "stats" },
    { label: "Comparer", value: "compare", url: "compare" },
  ];

  useEffect(() => {
    setTab(location.pathname.split("/").pop()!);
  }, [location.pathname]);

  const getStats = () => {
    if (id) {
      getStatsPlayerByPlayerId(Number(id)).then((res) => {
        setStatsGame(res.data as Array<StatsPlayer>);
      });
    }
  };

  const getTeams = () => {
    if (id) {
      getTeamByPlayerId(Number(id)).then((res) => {
        if (res.data) {
          setTeams(res.data.map((el) => el.team) as Array<Team>);
        }
      });
    }
  };

  const getStatsAvg = () => {
    if (id) {
      getStatsPlayerAvgByPlayerId(Number(id)).then((res) => {
        setStatsAvg(res.data as Array<StatsPlayerAvg>);
      });
    }
  };

  const getPlayer = () => {
    if (id) {
      getPlayerById(Number(id)).then((res) => {
        setPlayer(res.data as Player);
      });
    }
  };

  useEffect(() => {
    getPlayer();
    getStats();
    getStatsAvg();
    getTeams();
  }, [id]);

  const handleChangeTab = (_: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <PlayerContext.Provider
      value={{ teams, player, games: statsGame, avg: statsAvg }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <GoBackButton />
        </Grid>
        <Grid item xs={12}>
          <Paper
            variant="outlined"
            sx={{ width: "100%", bgcolor: "background.paper", p: 1 }}
          >
            <HeaderPlayer />
          </Paper>
        </Grid>
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
      </Grid>
    </PlayerContext.Provider>
  );
};
