import { Box, TextField, Typography } from "@mui/material";

interface Props {
  label: string;
  value: number | null;
  onChange?: (value: number) => void;
}

export const AddStatsBlock = ({ label, value, onChange }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        gap: 1,
      }}
    >
      <Typography variant="h4">{label}</Typography>
      <TextField
        size="small"
        fullWidth
        value={value !== null ? value : undefined}
        type="number"
        disabled={onChange ? false : true}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          if (onChange) onChange(Number(event.target.value));
        }}
      />
    </Box>
  );
};
