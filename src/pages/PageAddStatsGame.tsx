import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Grid, Paper, Tab, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { getGamesById } from "src/api/game";
import { getPlayersByEquipeId } from "src/api/player";
import { GoBackButton } from "src/components/navigation/GoBackButton";
import { AddPlayerStatsBlock } from "src/components/statistique/AddPlayerStatsBlock";
import { AddTeamStatsBlock } from "src/components/statistique/AddTeamStatsBlock";
import { Game } from "src/models/Game";
import { Player } from "src/models/Player";

export const PageAddStatsGame = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const [game, setGame] = useState<Game | undefined>(undefined);
  const [players, setPlayers] = useState<Array<Player>>([]);
  const tabs = [
    {
      label: t("commun.players"),
      value: "joueurs",
    },
    {
      label: t("commun.team"),
      value: "equipe",
    },
    {
      label: t("commun.shootingposition"),
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
      <Grid item xs={12}>
        <GoBackButton />
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h2">{t("commun.enterstatistics")}</Typography>
        {game && (
          <Typography variant="h4">
            {t("commun.gameonagainst", {
              date: moment(game.date).format("DD/MM/YYYY"),
              opponent: game.opponent,
            })}
          </Typography>
        )}
      </Grid>
      {game && (
        <TabContext value={tabSelect}>
          <Grid item xs={12}>
            <Paper
              variant="outlined"
              sx={{ width: "100%", bgcolor: "background.paper" }}
            >
              <TabList
                onChange={handleChangeTab}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="secondary"
              >
                {tabs.map((tab) => (
                  <Tab key={tab.value} label={tab.label} value={tab.value} />
                ))}
              </TabList>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <TabPanel value="equipe" sx={{ p: 0 }}>
              <AddTeamStatsBlock game={game} />
            </TabPanel>
            <TabPanel value="joueurs" sx={{ p: 0 }}>
              <AddPlayerStatsBlock game={game} players={players} />
            </TabPanel>
            <TabPanel value="tirs" sx={{ p: 0 }}>
              {t("commun.shoots")}
            </TabPanel>
          </Grid>
        </TabContext>
      )}
    </Grid>
  );
};
