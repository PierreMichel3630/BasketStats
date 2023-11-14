import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { addPlayerToTeam, insertPlayer } from "src/api/player";
import { MessageSnackbar } from "src/components/Snackbar";
import { Player } from "src/models/Player";
import * as Yup from "yup";

interface Props {
  onValid: () => void;
  teamId: number;
}
export const PlayerForm = ({ teamId, onValid }: Props) => {
  const { t } = useTranslation();

  const [message, setMessage] = useState("");

  const initialValue: {
    firstname: string;
    lastname: string;
    licence: string;
  } = {
    firstname: "",
    lastname: "",
    licence: "",
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required(t("form.createplayer.requiredfirstname")),
    lastname: Yup.string().required(t("form.createplayer.requiredlastname")),
    licence: Yup.string().required(t("form.createplayer.requiredlicence")),
  });

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const { data, error } = await insertPlayer({ ...values });
        if (error) {
          setMessage(t("commun.error"));
        } else {
          await addPlayerToTeam(data as Player, teamId);
          onValid();
        }
      } catch (err) {
        setMessage(t("commun.error"));
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <FormControl
            fullWidth
            error={Boolean(formik.touched.licence && formik.errors.licence)}
          >
            <InputLabel htmlFor="licence-input">
              {t("form.createplayer.licence")}
            </InputLabel>
            <OutlinedInput
              id="licence-input"
              type="text"
              value={formik.values.licence}
              name="licence"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              label={t("form.createplayer.licence")}
              inputProps={{}}
            />
            {formik.touched.licence && formik.errors.licence && (
              <FormHelperText error id="error-licence">
                {formik.errors.licence}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl
            fullWidth
            error={Boolean(formik.touched.firstname && formik.errors.firstname)}
          >
            <InputLabel htmlFor="firstname-input">
              {t("form.createplayer.firstname")}
            </InputLabel>
            <OutlinedInput
              id="firstname-input"
              type="text"
              value={formik.values.firstname}
              name="firstname"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              label={t("form.createplayer.firstname")}
              inputProps={{}}
            />
            {formik.touched.firstname && formik.errors.firstname && (
              <FormHelperText error id="error-firstname">
                {formik.errors.firstname}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl
            fullWidth
            error={Boolean(formik.touched.lastname && formik.errors.lastname)}
          >
            <InputLabel htmlFor="lastname-input">
              {t("form.createplayer.lastname")}
            </InputLabel>
            <OutlinedInput
              id="lastname-input"
              type="text"
              value={formik.values.lastname}
              name="lastname"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              label={t("form.createplayer.lastname")}
              inputProps={{}}
            />
            {formik.touched.lastname && formik.errors.lastname && (
              <FormHelperText error id="error-lastname">
                {formik.errors.lastname}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button
            disableElevation
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="secondary"
          >
            {t("commun.create")}
          </Button>
        </Grid>
      </Grid>
      <MessageSnackbar
        open={message !== ""}
        handleClose={() => setMessage("")}
        message={message}
      />
    </form>
  );
};
