import { Grid, Paper, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { getGamesByTeamId } from "src/api/game";

import { getTeamById } from "src/api/team";
import { HeaderTeam } from "src/components/header/HeaderTeam";
import { Game } from "src/models/Game";
import { Team } from "src/models/Team";

export const TeamPage = () => {
  const { id } = useParams();
  const location = useLocation();

  const [team, setTeam] = useState<undefined | Team>(undefined);
  const [games, setGames] = useState<Array<Game>>([]);
  const [tab, setTab] = useState<string>(location.pathname.split("/").pop()!);

  const tabs = [
    { label: "Home", value: "home", url: "home" },
    { label: "Matchs", value: "games", url: "games" },
    { label: "Joueurs", value: "players", url: "players" },
    { label: "Statistiques", value: "stats", url: "stats" },
  ];

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
      });
    }
  };

  useEffect(() => {
    getTeam();
    getGames();
  }, [id]);

  const handleChangeTab = (_: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper
          elevation={3}
          sx={{ width: "100%", bgcolor: "background.paper" }}
        >
          <Tabs
            value={tab}
            onChange={handleChangeTab}
            variant="fullWidth"
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
      {team && (
        <Grid item xs={12}>
          <Paper
            variant="outlined"
            elevation={3}
            sx={{ width: "100%", bgcolor: "background.paper", p: 1 }}
          >
            <HeaderTeam team={team} games={games} />
          </Paper>
        </Grid>
      )}
      <Grid item xs={12}>
        <Outlet />
      </Grid>
    </Grid>
  );
};
