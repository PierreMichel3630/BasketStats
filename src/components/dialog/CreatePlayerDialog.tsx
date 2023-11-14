import { Dialog, DialogContent, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { PlayerForm } from "src/forms/PlayerForm";

interface Props {
  open: boolean;
  close: () => void;
  teamId: number;
}

export const CreatePlayerDialog = ({ teamId, open, close }: Props) => {
  const { t } = useTranslation();

  return (
    <Dialog onClose={close} open={open}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography variant="h2">{t("commun.createplayer")}</Typography>
          </Grid>
          <Grid item xs={12}>
            <PlayerForm onValid={close} teamId={teamId} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
