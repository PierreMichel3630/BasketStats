import { Alert, Grid, Paper, Tab, Tabs } from "@mui/material";
import { useContext, useState } from "react";
import { ComparePlayerBlock } from "src/components/compare/ComparePlayerBlock";
import { CompareTeamBlock } from "src/components/compare/CompareTeamBlock";
import { TeamContext } from "./TeamPage";
import { useTranslation } from "react-i18next";

export const CompareTeamPage = () => {
  const { statsTeam, statsPlayer } = useContext(TeamContext);
  const { t } = useTranslation();
  const [tab, setTab] = useState<string>("game");

  const tabs = [
    { label: t("commun.games"), value: "game" },
    { label: t("commun.player"), value: "player" },
  ];

  const handleChangeTab = (_: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <Grid container spacing={1}>
      {statsPlayer.length > 0 && statsTeam.length > 0 ? (
        <>
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
        </>
      ) : (
        <Grid item xs={12}>
          <Alert severity="info">{t("alert.nostats")}</Alert>
        </Grid>
      )}
    </Grid>
  );
};
