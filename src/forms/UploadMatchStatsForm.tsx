import { Button, Grid } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MessageSnackbar } from "src/components/Snackbar";
import { FilesUploadInput } from "src/components/input/FileUploadInput";
import * as Yup from "yup";

interface Props {
  onValid: (files: Array<File>) => void;
}
export const UploadMatchStatsForm = ({ onValid }: Props) => {
  const { t } = useTranslation();

  const [message, setMessage] = useState("");

  const initialValue: {
    files: Array<File>;
  } = {
    files: [],
  };

  const validationSchema = Yup.object().shape({
    files: Yup.mixed().nullable(),
  });

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      onValid(values.files);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <FilesUploadInput formik={formik} />
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
            {t("commun.validate")}
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
