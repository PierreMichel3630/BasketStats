import { Dialog, DialogContent, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { GameForm } from "src/forms/GameForm";

interface Props {
  open: boolean;
  close: () => void;
  teamId: number;
}

export const CreateGameDialog = ({ teamId, open, close }: Props) => {
  const { t } = useTranslation();

  return (
    <Dialog onClose={close} open={open}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography variant="h2">{t("commun.creategame")}</Typography>
          </Grid>
          <Grid item xs={12}>
            <GameForm teamId={teamId} onValid={close} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
