import { Button, Grid } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPlayersByEquipeId } from "src/api/player";
import { CreatePlayerDialog } from "src/components/dialog/CreatePlayerDialog";
import { PlayerLeaderBlock } from "src/components/statistique/PlayerLeaderBlock";
import { TablePlayerStats } from "src/components/table/TablePlayer";
import { Player } from "src/models/Player";
import { TeamContext } from "./TeamPage";
import { useTranslation } from "react-i18next";
import { useAuth } from "src/context/AuthProviderSupabase";
import { MessageSnackbar } from "src/components/Snackbar";

export const PlayersTeamPage = () => {
  const { rightTeam, players, setPlayers, statsPlayer } =
    useContext(TeamContext);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const getPlayers = () => {
    if (id) {
      getPlayersByEquipeId(id).then((res) => {
        setPlayers(res.data.map((el) => el.player) as Array<Player>);
      });
    }
  };

  const addPlayer = () => {
    if (user) {
      if (rightTeam) {
        setOpen(true);
      } else {
        setMessage(t("commun.errorrightteam"));
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <PlayerLeaderBlock stats={statsPlayer} />
      </Grid>
      <Grid item xs={12}>
        <TablePlayerStats players={players} stats={statsPlayer} />
      </Grid>
      <Grid item xs={12}>
        <Button
          disableElevation
          fullWidth
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => addPlayer()}
        >
          {t("commun.addplayer")}
        </Button>
      </Grid>
      <CreatePlayerDialog
        open={open}
        close={() => {
          setOpen(false);
          getPlayers();
        }}
        teamId={Number(id)}
      />
      <MessageSnackbar
        open={message !== ""}
        handleClose={() => setMessage("")}
        message={message}
        severity="error"
      />
    </Grid>
  );
};
