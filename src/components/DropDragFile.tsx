import {
  Box,
  Grid,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { percent, px } from "csx";
import { style } from "typestyle";
import { useTranslation } from "react-i18next";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import logoPDF from "src/assets/pdf.png";

const imageCss = style({
  maxWidth: percent(100),
  maxHeight: px(300),
});
interface Props {
  file: null | File;
  onDrop: (file: File | null) => void;
}
export const DropDragFile = ({ file, onDrop }: Props) => {
  const { t } = useTranslation();

  const filterFiles = useCallback((acceptedFiles: Array<File>) => {
    const newFile = acceptedFiles[0];
    onDrop(newFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: filterFiles,
    accept: {
      "image/*": [".jpeg", ".png"],
    },
  });

  return (
    <Grid container spacing={1}>
      {file !== null && (
        <Grid item xs={12}>
          <ImageListItem>
            <img
              className={imageCss}
              alt="preview image"
              src={URL.createObjectURL(file)}
            />
            <ImageListItemBar
              title={file.name}
              actionIcon={
                <IconButton onClick={() => onDrop(null)}>
                  <DeleteIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        </Grid>
      )}
      <Grid item xs={12}>
        <Box
          sx={{
            p: 2,
            border: "1px dashed grey",
            cursor: "pointer",
            textAlign: "center",
          }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <CloudUploadIcon fontSize="large" />
          <Typography variant="body1">
            {isDragActive
              ? t("input.dragdrop.drophere")
              : t("input.dragdrop.text")}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

interface PropsPdf {
  files: Array<File>;
  onDrop: (files: Array<File>) => void;
}
export const DropDragFilesPdf = ({ files, onDrop }: PropsPdf) => {
  const { t } = useTranslation();

  const filterFiles = useCallback((acceptedFiles: Array<File>) => {
    const newFile = acceptedFiles;
    onDrop(newFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: filterFiles,
  });

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Box
          sx={{
            p: 2,
            border: "1px dashed grey",
            cursor: "pointer",
            textAlign: "center",
          }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <CloudUploadIcon fontSize="large" />
          <Typography variant="body1">
            {isDragActive
              ? t("input.dragdrop.drophere")
              : t("input.dragdrop.text")}
          </Typography>
        </Box>
      </Grid>
      {files.map((file) => (
        <Grid item xs={4}>
          <ImageListItem>
            <img height={50} alt="preview image" src={logoPDF} />
            <ImageListItemBar
              title={file.name}
              actionIcon={
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        </Grid>
      ))}
    </Grid>
  );
};
