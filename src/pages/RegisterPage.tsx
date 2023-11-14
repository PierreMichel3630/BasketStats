import {
  Card,
  Chip,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { style } from "typestyle";
import { viewHeight } from "csx";

import logo from "../assets/logo.png";
import { signUpWithGoogle } from "src/api/authentification";
import { GoogleButton } from "src/components/GoogleButton";
import { RegisterForm } from "src/forms/RegisterForm";

const cardCss = style({
  padding: 16,
});
export const RegisterPage = () => {
  const { t } = useTranslation();

  const connectGoogle = async () => {
    await signUpWithGoogle();
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ minHeight: viewHeight(100), display: "flex", alignItems: "center" }}
    >
      <Card variant="outlined" className={cardCss}>
        <Grid container spacing={1} sx={{ textAlign: "center" }}>
          <Grid item xs={12}>
            <Link to="/">
              <img src={logo} width={50} />
            </Link>
          </Grid>
          <Grid item xs={12} sx={{ mb: 3 }}>
            <Typography variant="h2">
              {t("form.register.createaccount")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <GoogleButton
              label={t("form.register.createaccountgoogle")}
              onClick={connectGoogle}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
            <Divider>
              <Chip label={t("commun.or")} />
            </Divider>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4">
              {t("form.register.createaccountemail")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <RegisterForm />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", gap: 1, justifyContent: "center" }}
          >
            <Typography variant="body1">
              {t("form.register.alreadyaccount")}
            </Typography>
            <Link to="/login">
              <Typography variant="body1" sx={{ textDecoration: "underline" }}>
                {t("form.register.connect")}
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};
