import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export const GoBackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      startIcon={<ArrowBackIosIcon />}
      onClick={() => navigate(-1)}
      sx={{ color: "text.primary" }}
    >
      <Typography variant="h6" color="text.primary">
        Retour
      </Typography>
    </Button>
  );
};

export const GoHomeButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      startIcon={<ArrowBackIosIcon />}
      onClick={() => navigate("/")}
      sx={{ color: "text.primary" }}
    >
      <Typography variant="h6" color="text.primary">
        Retour à l'accueil
      </Typography>
    </Button>
  );
};
