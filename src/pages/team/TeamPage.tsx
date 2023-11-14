import { Grid, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";

import { getTeamById } from "src/api/team";
import { HeaderTeam } from "src/components/header/HeaderTeam";
import { Team } from "src/models/Team";

export const TeamPage = () => {
  const { id } = useParams();
  const location = useLocation();

  const [team, setTeam] = useState<undefined | Team>(undefined);
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

  useEffect(() => {
    getTeam();
  }, [id]);

  const handleChangeTab = (_: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        {team && <HeaderTeam team={team} />}
      </Grid>
      <Grid item xs={12}>
        <Tabs value={tab} onChange={handleChangeTab} variant="fullWidth">
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
      </Grid>
      <Grid item xs={12}>
        <Outlet />
      </Grid>
      {/*<Grid item xs={8}>
        <Typography variant="h2">Joueurs</Typography>
      </Grid>
      <Grid item xs={4}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          size="small"
          fullWidth
          onClick={() => setOpenPlayer(true)}
        >
          {t("commun.createplayer")}
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TablePlayer players={players} />
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h2">Matchs</Typography>
      </Grid>
      <Grid item xs={4}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          size="small"
          fullWidth
          onClick={() => setOpenGame(true)}
        >
          {t("commun.creatematch")}
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TableGame games={games} />
      </Grid>
      <CreateGameDialog
        open={openGame}
        close={() => {
          setOpenGame(false);
          getGames();
        }}
        team={team}
      />
      <CreatePlayerDialog
        open={openPlayer}
        close={() => {
          setOpenPlayer(false);
          getPlayers();
        }}
        team={team}
      />*/}
    </Grid>
  );
};
