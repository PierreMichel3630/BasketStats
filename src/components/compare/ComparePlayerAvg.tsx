import {
  Box,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { px } from "csx";
import { useEffect, useState } from "react";
import { PlayerAvg, StatsPlayerAvg } from "src/models/Statistique";
import { Team } from "src/models/Team";
import { Colors } from "src/style/Colors";
import { getBreakpoint } from "src/utils/mediaQuery";

interface Props {
  teams: Array<Team>;
  playerStat: Array<StatsPlayerAvg>;
  playerAvgs: Array<PlayerAvg>;
}

export const ComparePlayerAvg = ({ playerAvgs, playerStat, teams }: Props) => {
  const breakpoint = getBreakpoint();
  const isSmall = breakpoint === "xs";

  const [team, setTeam] = useState<undefined | string>(undefined);
  const teamsSelect = teams.map((el) => ({
    value: el.id.toString(),
    label: `${el.name} (${el.abreviation})`,
  }));

  useEffect(() => {
    if (teams.length > 0) {
      setTeam(teams[0].id.toString());
    }
  }, [teams]);

  const handleChange = (event: SelectChangeEvent) => {
    setTeam(event.target.value);
  };

  const playerAvgsTeam = team
    ? playerAvgs.find((el) => el.team.id.toString() === team)
    : undefined;
  const playerStatTeam = team
    ? playerStat.find((el) => el.team.id.toString() === team)
    : undefined;

  const pointsAvg = playerAvgsTeam ? playerAvgsTeam.points ?? 0 : 0;
  const threePointsAvg = playerAvgsTeam
    ? playerAvgsTeam.threeptspassed ?? 0
    : 0;
  const lfAvg = playerAvgsTeam ? playerAvgsTeam.lfpassed ?? 0 : 0;
  const foulAvg = playerAvgsTeam ? playerAvgsTeam.fouls ?? 0 : 0;

  const pointsPlayer = playerStatTeam ? playerStatTeam.points ?? 0 : 0;
  const threePointsPlayer = playerStatTeam
    ? playerStatTeam.threeptspassed ?? 0
    : 0;
  const lfPlayer = playerStatTeam ? playerStatTeam.lfpassed ?? 0 : 0;
  const foulPlayer = playerStatTeam ? playerStatTeam.fouls ?? 0 : 0;

  return (
    <Paper
      variant="outlined"
      sx={{ width: "100%", bgcolor: "background.paper" }}
    >
      <Grid container>
        <Grid item xs={12} sx={{ bgcolor: "primary.main", p: 1 }}>
          <Typography variant="h4" color="white">
            COMPARAISON
          </Typography>
        </Grid>
        {teams.length > 1 && (
          <Grid
            item
            xs={12}
            sx={{
              mt: 1,
              p: 2,
            }}
          >
            <FormControl size="small" fullWidth>
              <InputLabel id="select-team">Équipe</InputLabel>
              <Select
                id="select-team"
                value={team}
                label="Équipe"
                onChange={handleChange}
                fullWidth
              >
                {teamsSelect.map((team) => (
                  <MenuItem value={team.value}>{team.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
        <Grid
          item
          xs={12}
          sx={{
            mt: 1,
            display: "flex",
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: Colors.blue,
              width: px(15),
              height: px(15),
              borderRadius: px(5),
            }}
          />
          <Typography variant="h4" color="white">
            Joueur
          </Typography>
          <Box
            sx={{
              backgroundColor: "secondary.main",
              width: px(15),
              height: px(15),
              borderRadius: px(5),
            }}
          />
          <Typography variant="h4" color="white">
            Moyenne joueur de l'équipe
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ p: 1 }}>
          {team && (
            <Grid container spacing={1} columns={{ xs: 1, sm: 2, md: 4 }}>
              <Grid item xs={1}>
                <Card
                  label="Points"
                  value1={pointsPlayer}
                  value2={pointsAvg}
                  max={Math.max(pointsAvg, pointsPlayer)}
                />
              </Grid>
              <Grid item xs={1}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexDirection: isSmall ? "column" : "row",
                  }}
                >
                  <Divider
                    orientation={isSmall ? "horizontal" : "vertical"}
                    flexItem
                  />
                  <Card
                    label="3PTS"
                    value1={threePointsPlayer}
                    value2={threePointsAvg}
                    max={Math.max(threePointsAvg, threePointsPlayer)}
                  />
                </Box>
              </Grid>
              <Grid item xs={1}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexDirection: isSmall ? "column" : "row",
                  }}
                >
                  <Divider
                    orientation={isSmall ? "horizontal" : "vertical"}
                    flexItem
                  />
                  <Card
                    label="LF"
                    value1={lfPlayer}
                    value2={lfAvg}
                    max={Math.max(lfAvg, lfPlayer)}
                  />
                </Box>
              </Grid>
              <Grid item xs={1}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexDirection: isSmall ? "column" : "row",
                  }}
                >
                  <Divider
                    orientation={isSmall ? "horizontal" : "vertical"}
                    flexItem
                  />
                  <Card
                    label="Fautes"
                    value1={foulPlayer}
                    value2={foulAvg}
                    max={Math.max(foulAvg, foulPlayer)}
                  />
                </Box>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

interface PropsCard {
  label: string;
  value1: number;
  value2: number;
  max?: number;
}
const Card = ({ label, value1, value2, max = 25 }: PropsCard) => {
  const MAXHEIGHT = 100;
  const height1 = (value1 / max) * MAXHEIGHT;
  const height2 = (value2 / max) * MAXHEIGHT;

  return (
    <Grid container spacing={1}>
      <Grid
        item
        xs={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          height: px(150),
        }}
      >
        <Typography variant={value1 > value2 ? "h3" : "h6"}>
          {value1.toFixed(1)}
        </Typography>
        <Box
          sx={{
            backgroundColor: Colors.blue,
            width: px(40),
            height: px(height1),
            borderRadius: px(5),
          }}
        />
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Typography variant={value2 > value1 ? "h3" : "h6"}>
          {value2.toFixed(1)}
        </Typography>
        <Box
          sx={{
            backgroundColor: "secondary.main",
            width: px(40),
            height: px(height2),
            borderRadius: px(5),
          }}
        />
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h4">{label}</Typography>
      </Grid>
    </Grid>
  );
};
