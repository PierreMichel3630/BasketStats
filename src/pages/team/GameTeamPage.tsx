import { Alert, Button, Grid } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGamesByTeamId } from "src/api/game";
import { CreateGameDialog } from "src/components/dialog/CreateGameDialog";
import { TableGame } from "src/components/table/TableGame";
import { Game } from "src/models/Game";
import { TeamContext } from "./TeamPage";
import { useTranslation } from "react-i18next";
import { useAuth } from "src/context/AuthProviderSupabase";
import { MessageSnackbar } from "src/components/Snackbar";

export const GameTeamPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { games, setGames, rightTeam } = useContext(TeamContext);
  const { t } = useTranslation();
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const getGames = () => {
    if (id) {
      getGamesByTeamId(id).then((res) => {
        setGames(res.data as Array<Game>);
      });
    }
  };

  const addGame = () => {
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
      {games.length > 0 ? (
        <Grid item xs={12}>
          <TableGame games={games} isRight={rightTeam !== undefined} />
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Alert severity="info">{t("commun.nogame")}</Alert>
        </Grid>
      )}
      <Grid item xs={12}>
        <Button
          disableElevation
          fullWidth
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => addGame()}
        >
          {t("commun.addgame")}
        </Button>
      </Grid>
      <CreateGameDialog
        open={open}
        close={() => {
          setOpen(false);
          getGames();
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
