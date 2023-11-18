import { Grid, Paper, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGamesById } from "src/api/game";
import {
  getStatsPlayerByGameId,
  getStatsTeamByGameId,
} from "src/api/statistique";
import { HeaderGame } from "src/components/header/HeaderGame";
import { GoBackButton } from "src/components/navigation/GoBackButton";
import { TableBoxscore } from "src/components/table/TableBoxscore";
import { TableTeamStats } from "src/components/table/TableTeamStats";
import { Game } from "src/models/Game";
import { StatsPlayer, StatsTeam } from "src/models/Statistique";

export const PageStatsGame = () => {
  const { id } = useParams();

  const [game, setGame] = useState<Game | undefined>(undefined);
  const [statsTeam, setStatsTeam] = useState<StatsTeam | undefined>(undefined);
  const [statsPlayer, setStatsPlayer] = useState<Array<StatsPlayer>>([]);
  const [tab, setTab] = useState<string>("feuille");

  const tabs = [
    { label: "Feuille de match", value: "feuille" },
    { label: "Comparaisons d'équipe", value: "equipe" },
  ];

  const handleChangeTab = (_: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
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
        setStatsTeam(res.data as StatsTeam);
      });
    }
  };

  const getStatsPlayer = () => {
    if (id) {
      getStatsPlayerByGameId(Number(id)).then((res) => {
        setStatsPlayer(res.data as Array<StatsPlayer>);
      });
    }
  };

  useEffect(() => {
    getGame();
    getStatsTeam();
    getStatsPlayer();
  }, [id]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <GoBackButton />
      </Grid>
      {game && statsTeam && (
        <Grid item xs={12}>
          <HeaderGame game={game} stats={statsTeam} />
        </Grid>
      )}
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
                label={el.label}
                aria-label={el.label}
              />
            ))}
          </Tabs>
        </Paper>
      </Grid>
      <Grid item xs={12} sx={{ mt: 3 }}>
        {tab === "feuille" ? (
          <TableBoxscore stats={statsPlayer} />
        ) : (
          game && statsTeam && <TableTeamStats game={game} stats={statsTeam} />
        )}
      </Grid>
    </Grid>
  );
};
