import { Switch, styled } from "@mui/material";
import { Colors } from "src/style/Colors";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
}

const IsPlaySwitchStyle = styled(Switch)(({ theme }) => ({
  width: 70,
  height: 30,
  padding: 3,
  "& .MuiSwitch-switchBase": {
    padding: 1,
    transform: "translate(5px, 3px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translate(40px, 3px)",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: Colors.green,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 50,
    height: 50,
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: Colors.red,
    borderRadius: 50,
  },
}));

export const IsPlaySwitch = ({ value, onChange }: Props) => (
  <IsPlaySwitchStyle
    icon={<CloseIcon sx={{ width: 20, heigth: 20 }} />}
    checkedIcon={<CheckIcon sx={{ width: 20, heigth: 20 }} />}
    checked={value}
    onChange={(_, newValue) => onChange(newValue)}
  />
);
