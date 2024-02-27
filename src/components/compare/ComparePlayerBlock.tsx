import { Grid, Paper, Typography } from "@mui/material";
import { padding, px } from "csx";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { UserContext } from "src/App";
import { getShootByPlayer } from "src/api/shoot";
import { Player } from "src/models/Player";
import { Shoot } from "src/models/Shoot";
import { StatsPlayerAvg } from "src/models/Statistique";
import { Colors } from "src/style/Colors";
import { sortByPlayerName } from "src/utils/sort";
import { LineCompareTable } from "../LineCompareTable";
import { ToogleButtonTotal } from "../ToogleButton";
import { DonutRepartitionFautesPlayer2 } from "../chart/DonutRepartitionFautes";
import { DonutRepartitionPtsMarquesPlayer2 } from "../chart/DonutRepartitionPts";
import { DonutRepartitionShootPlayer2 } from "../chart/DonutRepartitionShoot";
import { SelectStatsPlayer } from "../input/Select";
import { ShootCourtBlock } from "../shoot/ShootCourtBlock";

interface Props {
  player?: Player;
  statsAvg: Array<StatsPlayerAvg>;
  shoots: Array<Shoot>;
}

export const ComparePlayerBlock = ({ player, statsAvg, shoots }: Props) => {
  const { t } = useTranslation();
  const [shootsCompare, setShootCompare] = useState<Array<Shoot>>([]);
  const { total, setTotal } = useContext(UserContext);
  const isTypeMoy = !total;

  const VALUES = statsAvg.sort(sortByPlayerName).map((stat) => ({
    label: `${stat.player.firstname} ${stat.player.lastname}`,
    value: stat.player.id,
    stats: stat,
  }));
  const [value1, setValue1] = useState(VALUES[0]);
  const [value2, setValue2] = useState(VALUES[1]);

  const getValue1 = () => {
    const value0 = player
      ? VALUES.find((el) => el.value === player.id)
      : VALUES[0];
    return player ? (value0 ? value0 : VALUES[0]) : VALUES[0];
  };

  useEffect(() => {
    setValue1(getValue1());
    setValue2(VALUES[1]);
  }, [statsAvg]);

  const getShoots = () => {
    if (value2) {
      getShootByPlayer(Number(value2.stats.player.id)).then((res) => {
        setShootCompare(res.data as Array<Shoot>);
      });
    } else {
      setShootCompare([]);
    }
  };

  useEffect(() => {
    getShoots();
  }, [value2]);

  const pts = isTypeMoy
    ? value1.stats.points ?? 0
    : (value1.stats.points ?? 0) * value1.stats.games;
  const ptsadv = isTypeMoy
    ? value2.stats.points ?? 0
    : (value2.stats.points ?? 0) * value2.stats.games;
  const MAX = Math.max(pts, ptsadv);

  const datas = [
    {
      label: t("commun.points"),
      value1: pts,
      value2: ptsadv,
      fixed: 1,
      max: MAX,
    },
    {
      label: t("commun.threepoints"),
      value1: isTypeMoy
        ? value1.stats.threeptspassed ?? 0
        : (value1.stats.threeptspassed ?? 0) * value1.stats.games,
      value2: isTypeMoy
        ? value2.stats.threeptspassed ?? 0
        : (value2.stats.threeptspassed ?? 0) * value2.stats.games,
      fixed: 1,
      max: MAX,
    },
    {
      label: t("commun.twopointsint"),
      value1: isTypeMoy
        ? value1.stats.twoptsintpassed ?? 0
        : (value1.stats.twoptsintpassed ?? 0) * value1.stats.games,
      value2: isTypeMoy
        ? value2.stats.twoptsintpassed ?? 0
        : (value2.stats.twoptsintpassed ?? 0) * value2.stats.games,
      fixed: 1,
      max: MAX,
    },
    {
      label: t("commun.twopointsext"),
      value1: isTypeMoy
        ? value1.stats.twoptsextpassed ?? 0
        : (value1.stats.twoptsextpassed ?? 0) * value1.stats.games,
      value2: isTypeMoy
        ? value2.stats.twoptsextpassed ?? 0
        : (value2.stats.twoptsextpassed ?? 0) * value2.stats.games,
      fixed: 1,
      max: MAX,
    },
    {
      label: t("commun.ft"),
      value1: isTypeMoy
        ? value1.stats.lfpassed ?? 0
        : (value1.stats.lfpassed ?? 0) * value1.stats.games,
      value2: isTypeMoy
        ? value2.stats.lfpassed ?? 0
        : (value2.stats.lfpassed ?? 0) * value2.stats.games,
      fixed: 1,
      max: MAX,
    },
    {
      label: t("commun.fouls"),
      value1: isTypeMoy
        ? value1.stats.fouls ?? 0
        : (value1.stats.fouls ?? 0) * value1.stats.games,
      value2: isTypeMoy
        ? value2.stats.fouls ?? 0
        : (value2.stats.fouls ?? 0) * value2.stats.games,
      fixed: 1,
      max: MAX,
    },
  ];

  const shootsLeft = shoots.filter(
    (el) => value1.stats.player.id === el.player
  );

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Paper
          variant="outlined"
          sx={{ width: "100%", bgcolor: "background.paper", pb: 2 }}
        >
          <Grid container>
            <Grid item xs={12} sx={{ bgcolor: Colors.subprimary, p: 1 }}>
              <Grid container alignItems="center">
                <Grid item xs={6} sm={5} sx={{ textAlign: "center" }}>
                  {player ? (
                    <>
                      <Typography variant="h4" color="white">
                        {value1.label}
                      </Typography>
                      <Typography variant="h6" color="white">
                        ({value1.stats.games} {t("commun.games")})
                      </Typography>
                    </>
                  ) : (
                    <SelectStatsPlayer
                      value={value1}
                      results={VALUES}
                      onSelect={(value) => setValue1(value)}
                    />
                  )}
                </Grid>
                <Grid item xs={2} display={{ xs: "none", sm: "block" }} />
                <Grid item xs={6} sm={5} sx={{ textAlign: "center" }}>
                  <SelectStatsPlayer
                    value={value2}
                    results={VALUES}
                    onSelect={(value) => setValue2(value)}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                bgcolor: "primary.main",
                p: padding(px(2), px(8)),
                mb: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <ToogleButtonTotal
                value={total ? "total" : "pergame"}
                onChange={(value) => setTotal(value === "total")}
              />
            </Grid>
            {statsAvg.length > 0 && (
              <Grid item xs={12} sx={{ pl: 1, pr: 1 }}>
                <Grid container spacing={1}>
                  {datas.map((el, index) => (
                    <Grid item xs={12} key={index}>
                      <LineCompareTable value={el} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Grid>
      <Grid item md={6} display={{ xs: "none", md: "block" }}>
        <DonutRepartitionPtsMarquesPlayer2 stat={value1.stats} />
      </Grid>
      <Grid item md={6} display={{ xs: "none", md: "block" }}>
        <DonutRepartitionPtsMarquesPlayer2 stat={value2.stats} />
      </Grid>

      <Grid item md={6} display={{ xs: "none", md: "block" }}>
        <DonutRepartitionShootPlayer2 stat={value1.stats} />
      </Grid>
      <Grid item md={6} display={{ xs: "none", md: "block" }}>
        <DonutRepartitionShootPlayer2 stat={value2.stats} />
      </Grid>

      <Grid item md={6} display={{ xs: "none", md: "block" }}>
        <DonutRepartitionFautesPlayer2 stat={value1.stats} />
      </Grid>
      <Grid item md={6} display={{ xs: "none", md: "block" }}>
        <DonutRepartitionFautesPlayer2 stat={value2.stats} />
      </Grid>
      <Grid item xs={12}>
        <ShootCourtBlock shootsLeft={shootsLeft} shootsRight={shootsCompare} />
      </Grid>
    </Grid>
  );
};
