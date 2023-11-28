import { Grid } from "@mui/material";
import { useContext } from "react";
import { StartingFiveBlock } from "src/components/StartingFiveBlock";
import { PlayerLeaderBlock } from "src/components/statistique/PlayerLeaderBlock";
import { TeamLeaderBlock } from "src/components/statistique/TeamLeaderBlock";
import { TeamContext } from "./TeamPage";

export const HomeTeamPage = () => {
  const { statsTeam, statsPlayer } = useContext(TeamContext);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <StartingFiveBlock stats={statsPlayer} />
      </Grid>
      <Grid item xs={12}>
        <PlayerLeaderBlock stats={statsPlayer} />
      </Grid>
      <Grid item xs={12}>
        <TeamLeaderBlock stats={statsTeam} />
      </Grid>
    </Grid>
  );
};
