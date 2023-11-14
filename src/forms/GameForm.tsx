import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
} from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import { useFormik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { insertGame } from "src/api/game";
import { MessageSnackbar } from "src/components/Snackbar";
import * as Yup from "yup";

interface Props {
  teamId: number;
  onValid: () => void;
}

export const GameForm = ({ teamId, onValid }: Props) => {
  const { t } = useTranslation();

  const [message, setMessage] = useState("");

  const initialValue: {
    date: null | Date;
    opponent: string;
    team_score: null;
    opponent_score: null;
    is_outside: boolean;
  } = {
    date: null,
    opponent: "",
    team_score: null,
    opponent_score: null,
    is_outside: false,
  };

  const validationSchema = Yup.object().shape({
    date: Yup.date()
      .required(t("form.createplayer.requiredfirstname"))
      .typeError(t("form.createplayer.typeerrordate")),
    opponent: Yup.string().required(t("form.createplayer.requiredlastname")),
  });

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const { error } = await insertGame({
          ...values,
          date: values.date !== null ? values.date : new Date(),
          team: teamId,
        });
        if (error) {
          setMessage(t("commun.error"));
        } else {
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
          <DateField
            label={t("form.creategame.date")}
            value={formik.values.date}
            onChange={(value) => {
              if (value !== null) {
                formik.setFieldValue("date", value, true);
              }
            }}
            fullWidth
            slotProps={{
              textField: {
                variant: "outlined",
                error:
                  formik.touched.date !== undefined &&
                  Boolean(formik.errors.date),
                helperText: formik.touched.date && formik.errors.date,
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl
            fullWidth
            error={Boolean(formik.touched.opponent && formik.errors.opponent)}
          >
            <InputLabel htmlFor="opponent-input">
              {t("form.creategame.opponent")}
            </InputLabel>
            <OutlinedInput
              id="opponent-input"
              type="text"
              value={formik.values.opponent}
              name="opponent"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              label={t("form.creategame.opponent")}
              inputProps={{}}
            />
            {formik.touched.opponent && formik.errors.opponent && (
              <FormHelperText error id="error-opponent">
                {formik.errors.opponent}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <FormControl>
            <RadioGroup
              row
              name="is_outside"
              value={formik.values.is_outside}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            >
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Domicile"
              />
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Extérieur"
              />
            </RadioGroup>
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
