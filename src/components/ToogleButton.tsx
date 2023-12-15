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

interface PropsTotal {
  value: string;
  onChange: (value: string) => void;
}
export const ToogleButtonTotal = ({ value, onChange }: PropsTotal) => {
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

interface Props {
  select: string;
  onChange: (value: string) => void;
  values: Array<{
    label: string;
    value: string;
  }>;
}
export const ToogleButtonCard = ({ select, values, onChange }: Props) => {
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
        value={select}
        exclusive
        onChange={handleChange}
      >
        {values.map((el) => (
          <ToggleButton value={el.value}>{el.label}</ToggleButton>
        ))}
      </StyledToggleButtonGroup>
    </Paper>
  );
};

export const ToogleButtonBase = ({ select, values, onChange }: Props) => {
  const handleChange = (_: React.MouseEvent<HTMLElement>, newValue: string) => {
    onChange(newValue);
  };

  return (
    <Paper elevation={0} sx={{ display: "flex", justifyContent: "center" }}>
      <ToggleButtonGroup
        size="small"
        value={select}
        exclusive
        onChange={handleChange}
      >
        {values.map((el) => (
          <ToggleButton value={el.value}>{el.label}</ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Paper>
  );
};
