import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Grid, Tab, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGamesById } from "src/api/game";
import { getPlayersByEquipeId } from "src/api/player";
import { AddPlayerStatsBlock } from "src/components/statistique/AddPlayerStatsBlock";
import { AddTeamStatsBlock } from "src/components/statistique/AddTeamStatsBlock";
import { Game } from "src/models/Game";
import { Player } from "src/models/Player";

export const PageAddStatsGame = () => {
  const { id } = useParams();

  const [game, setGame] = useState<Game | undefined>(undefined);
  const [players, setPlayers] = useState<Array<Player>>([]);
  const tabs = [
    {
      label: "Joueurs",
      value: "joueurs",
    },
    {
      label: "Équipe",
      value: "equipe",
    },
    {
      label: "Position de tirs",
      value: "tirs",
    },
  ];
  const [tabSelect, setTabSelect] = useState("joueurs");

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

  const getGame = () => {
    if (id) {
      getGamesById(id).then((res) => {
        setGame(res.data as Game);
      });
    }
  };

  useEffect(() => {
    getGame();
  }, [id]);

  const handleChangeTab = (_: React.SyntheticEvent, newValue: string) => {
    setTabSelect(newValue);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h2">Saisir Statistique</Typography>
        {game && (
          <Typography variant="h4">
            Match du {moment(game.date).format("DD/MM/YYYY")} contre{" "}
            {game.opponent}
          </Typography>
        )}
      </Grid>
      {game && (
        <TabContext value={tabSelect}>
          <Grid item xs={12}>
            <TabList onChange={handleChangeTab} centered>
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </TabList>
          </Grid>
          <Grid item xs={12}>
            <TabPanel value="equipe">
              <AddTeamStatsBlock game={game} />
            </TabPanel>
            <TabPanel value="joueurs">
              <AddPlayerStatsBlock game={game} players={players} />
            </TabPanel>
            <TabPanel value="tirs">tirs</TabPanel>
          </Grid>
        </TabContext>
      )}
    </Grid>
  );
};
