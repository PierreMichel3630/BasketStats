import { Dialog, DialogContent, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { TeamForm } from "src/forms/TeamForm";

interface Props {
  open: boolean;
  close: () => void;
}

export const CreateTeamDialog = ({ open, close }: Props) => {
  const { t } = useTranslation();

  return (
    <Dialog onClose={close} open={open}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography variant="h2">{t("commun.createteam")}</Typography>
          </Grid>
          <Grid item xs={12}>
            <TeamForm />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
