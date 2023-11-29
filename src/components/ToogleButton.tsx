import { Paper, ToggleButton, ToggleButtonGroup, styled } from "@mui/material";
import { px } from "csx";
import { useTranslation } from "react-i18next";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: px(2),
    border: 0,
    fontSize: px(10),
    "&.MuiButtonBase-root": {
      padding: px(5),
    },
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

interface Props {
  value: string;
  onChange: (value: string) => void;
}
export const ToogleButtonTotal = ({ value, onChange }: Props) => {
  const { t } = useTranslation();

  const handleChange = (_: React.MouseEvent<HTMLElement>, newValue: string) => {
    onChange(newValue);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        border: (theme) => `1px solid ${theme.palette.divider}`,
        flexWrap: "wrap",
      }}
    >
      <StyledToggleButtonGroup
        size="small"
        value={value}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="pergame">
          {t("commun.averageabbreviation")}
        </ToggleButton>
        <ToggleButton value="total">
          {t("commun.totalabbreviation2")}
        </ToggleButton>
      </StyledToggleButtonGroup>
    </Paper>
  );
};
