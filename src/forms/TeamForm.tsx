import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useFormik } from "formik";
import moment from "moment";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { BUCKET_TEAM, URL_STORAGE, storeFile } from "src/api/storage";
import { insertTeam } from "src/api/team";
import { MessageSnackbar } from "src/components/Snackbar";
import { FileUploadInput } from "src/components/input/FileUploadInput";
import deburr from "lodash.deburr";
import * as Yup from "yup";
import { TypeTeam } from "src/models/Team";

export const TeamForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const initialValue: {
    name: string;
    club: string;
    image: null | File;
  } = {
    name: "",
    club: "",
    image: null,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t("form.createteam.requiredname")),
    club: Yup.string(),
    image: Yup.mixed().nullable(),
  });

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        let image: null | string = null;
        if (values.image !== null) {
          const name = deburr(values.name) + "-" + moment().toISOString();

          let { data } = await storeFile(
            BUCKET_TEAM,
            name,
            values.image as unknown as File
          );
          image = data !== null ? data.path : null;
        }
        const { data, error } = await insertTeam({
          ...values,
          image: URL_STORAGE + BUCKET_TEAM + "/" + image,
          type: TypeTeam.TEAM,
        });
        if (error) {
          setMessage(t("commun.error"));
        } else {
          navigate("/team/" + data.id);
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
            error={Boolean(formik.touched.name && formik.errors.name)}
          >
            <InputLabel htmlFor="name-input">
              {t("form.createteam.name")}
            </InputLabel>
            <OutlinedInput
              id="name-input"
              type="text"
              value={formik.values.name}
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              label={t("form.createteam.name")}
              inputProps={{}}
            />
            {formik.touched.name && formik.errors.name && (
              <FormHelperText error id="error-name">
                {formik.errors.name}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl
            fullWidth
            error={Boolean(formik.touched.club && formik.errors.club)}
          >
            <InputLabel htmlFor="club-input">
              {t("form.createteam.club")}
            </InputLabel>
            <OutlinedInput
              id="club-input"
              type="text"
              value={formik.values.club}
              name="club"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              label={t("form.createteam.club")}
              inputProps={{}}
            />
            {formik.touched.club && formik.errors.club && (
              <FormHelperText error id="error-club">
                {formik.errors.club}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FileUploadInput formik={formik} />
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
