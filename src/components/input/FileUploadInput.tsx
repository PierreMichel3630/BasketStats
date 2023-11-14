import { FormControl, FormHelperText } from "@mui/material";
import { DropDragFile, DropDragFilesPdf } from "../DropDragFile";

interface Props {
  formik: any;
}

export const FileUploadInput = ({ formik }: Props) => (
  <FormControl
    fullWidth
    error={Boolean(formik.touched.image && formik.errors.image)}
  >
    <DropDragFile
      file={formik.values.image}
      onDrop={(file) => formik.setFieldValue("image", file)}
    />
    <FormHelperText error id="error-image">
      {formik.errors.image}
    </FormHelperText>
  </FormControl>
);

interface Props {
  formik: any;
}

export const FilesUploadInput = ({ formik }: Props) => (
  <FormControl
    fullWidth
    error={Boolean(formik.touched.files && formik.errors.files)}
  >
    <DropDragFilesPdf
      files={formik.values.files}
      onDrop={(files) => formik.setFieldValue("files", files)}
    />
    <FormHelperText error id="error-files">
      {formik.errors.files}
    </FormHelperText>
  </FormControl>
);
