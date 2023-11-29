import { Alert, Grid } from "@mui/material";
import { useContext } from "react";
import { StartingFiveBlock } from "src/components/StartingFiveBlock";
import { PlayerLeaderBlock } from "src/components/statistique/PlayerLeaderBlock";
import { TeamLeaderBlock } from "src/components/statistique/TeamLeaderBlock";
import { TeamContext } from "./TeamPage";
import { useTranslation } from "react-i18next";

export const HomeTeamPage = () => {
  const { t } = useTranslation();
  const { players, statsTeam, statsPlayer } = useContext(TeamContext);

  return (
    <Grid container spacing={1}>
      {statsPlayer.length > 0 || statsTeam.length > 0 ? (
        <>
          <Grid item xs={12}>
            <StartingFiveBlock stats={statsPlayer} />
          </Grid>
          <Grid item xs={12}>
            <PlayerLeaderBlock stats={statsPlayer} />
          </Grid>
          <Grid item xs={12}>
            <TeamLeaderBlock stats={statsTeam} />
          </Grid>
        </>
      ) : (
        <Grid item xs={12}>
          <Alert severity="info">{t("alert.nostats")}</Alert>
        </Grid>
      )}
      {players.length === 0 && (
        <Grid item xs={12}>
          <Alert severity="info">{t("alert.noplayer")}</Alert>
        </Grid>
      )}
    </Grid>
  );
};
