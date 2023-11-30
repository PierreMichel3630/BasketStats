import { Box, Grid, Paper, Typography } from "@mui/material";
import { percent, px } from "csx";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "src/App";
import { StatsPlayerAvg, StatsTeam } from "src/models/Statistique";
import { Colors } from "src/style/Colors";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface Value {
  value: string;
  label: string;
  stats: Array<StatsTeam>;
}
interface Props {
  value: Value;
  onSelect: (value: Value) => void;
  results: Array<Value>;
}

export const SelectStatsTeam = ({ value, onSelect, results }: Props) => {
  const { mode } = useContext(UserContext);
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused((prev) => !prev);
  const unFocus = () => setFocused(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        unFocus();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return (
    <div style={{ position: "relative" }} ref={ref}>
      <Box
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: percent(100),
          cursor: "pointer",
          justifyContent: "center",
          gap: 1,
        }}
        onClick={onFocus}
      >
        <Box>
          <Typography variant="h2" color="white">
            {value.label}
          </Typography>
          <Typography variant="h6" color="white">
            ({value.stats.length} matchs)
          </Typography>
        </Box>
        <ArrowDropDownIcon sx={{ color: "white" }} />
      </Box>
      {results.length > 0 && focused && (
        <Paper
          variant="outlined"
          sx={{
            display: "flex",
            alignItems: "center",
            width: percent(100),
            zIndex: 2,
            flexDirection: "column",
            position: "absolute",
            maxHeight: px(200),
            overflow: "scroll",
          }}
        >
          {results.map((el) => (
            <Grid
              container
              sx={{
                cursor: "pointer",
                p: 1,
                "&:hover": {
                  color:
                    mode === "dark" ? Colors.lightgrey : Colors.greyDarkMode,
                  backgroundColor:
                    mode === "dark" ? Colors.greyDarkMode : Colors.lightgrey,
                },
              }}
              alignItems="center"
              onClick={() => {
                onSelect(el);
                unFocus();
              }}
              key={el.value}
            >
              <Grid item xs={12}>
                <Typography variant="body1">{el.label}</Typography>
              </Grid>
            </Grid>
          ))}
        </Paper>
      )}
    </div>
  );
};

interface ValuePlayer {
  value: number;
  label: string;
  stats: StatsPlayerAvg;
}
interface PropsPlayer {
  value: ValuePlayer;
  onSelect: (value: ValuePlayer) => void;
  results: Array<ValuePlayer>;
}

export const SelectStatsPlayer = ({
  value,
  onSelect,
  results,
}: PropsPlayer) => {
  const { mode } = useContext(UserContext);
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused((prev) => !prev);
  const unFocus = () => setFocused(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        unFocus();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return (
    <div style={{ position: "relative" }} ref={ref}>
      <Box
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: percent(100),
          cursor: "pointer",
          justifyContent: "center",
          gap: 1,
        }}
        onClick={onFocus}
      >
        <Box>
          <Typography variant="h4" color="white">
            {value.label}
          </Typography>
          <Typography variant="h6" color="white">
            ({value.stats.games} matchs)
          </Typography>
        </Box>
        <ArrowDropDownIcon sx={{ color: "white" }} />
      </Box>
      {results.length > 0 && focused && (
        <Paper
          variant="outlined"
          sx={{
            display: "flex",
            alignItems: "center",
            width: percent(100),
            zIndex: 2,
            flexDirection: "column",
            position: "absolute",
            maxHeight: px(200),
            overflow: "scroll",
          }}
        >
          {results.map((el) => (
            <Grid
              container
              sx={{
                cursor: "pointer",
                p: 1,
                "&:hover": {
                  color:
                    mode === "dark" ? Colors.lightgrey : Colors.greyDarkMode,
                  backgroundColor:
                    mode === "dark" ? Colors.greyDarkMode : Colors.lightgrey,
                },
              }}
              alignItems="center"
              onClick={() => {
                onSelect(el);
                unFocus();
              }}
              key={el.value}
            >
              <Grid item xs={12}>
                <Typography variant="body1">{el.label}</Typography>
              </Grid>
            </Grid>
          ))}
        </Paper>
      )}
    </div>
  );
};
