import { Grid, Paper, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getStatsPlayerAvgByTeamId,
  getStatsTeamByTeamId,
} from "src/api/statistique";
import { ComparePlayerBlock } from "src/components/compare/ComparePlayerBlock";
import { CompareTeamBlock } from "src/components/compare/CompareTeamBlock";
import { StatsPlayerAvg, StatsTeam } from "src/models/Statistique";

export const CompareTeamPage = () => {
  const { id } = useParams();
  const [statsTeam, setStatsTeam] = useState<Array<StatsTeam>>([]);
  const [statsPlayer, setStatsPlayer] = useState<Array<StatsPlayerAvg>>([]);
  const [tab, setTab] = useState<string>("game");

  const tabs = [
    { label: "Matchs", value: "game" },
    { label: "Joueur", value: "player" },
  ];

  const getStatsTeam = () => {
    if (id) {
      getStatsTeamByTeamId(Number(id)).then((res) => {
        setStatsTeam(res.data as Array<StatsTeam>);
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

  useEffect(() => {
    getStatsTeam();
    getStatsPlayer();
  }, [id]);

  const handleChangeTab = (_: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Paper
          variant="outlined"
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
        {tab === "game" ? (
          <CompareTeamBlock stats={statsTeam} />
        ) : (
          <ComparePlayerBlock stats={statsPlayer} />
        )}
      </Grid>
    </Grid>
  );
};
