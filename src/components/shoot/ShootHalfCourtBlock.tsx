import { Box, Grid, Typography } from "@mui/material";
import { percent, px } from "csx";
import { Fragment } from "react";
import halfCourt from "src/assets/halfCourt.png";
import { Shoot, TypeShoot } from "src/models/Shoot";
import { Zone, getShootsZone } from "src/utils/calcul";
import {
  CourtExteriorFront,
  CourtExteriorLeft,
  CourtExteriorRight,
  LeftThreePoint,
  RightThreePoint,
} from "../svg/courtSvg";
import { ShootPoint } from "./ShootPoint";

interface Props {
  shoots: Array<Shoot>;
  type: string;
}
export const ShootHalfCourtBlock = ({ shoots, type }: Props) => {
  return (
    <Grid container>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: px(800),
          }}
        >
          <img src={halfCourt} width="100%" />
          {
            {
              shoot: (
                <>
                  {shoots.map((shoot, index) => (
                    <Fragment key={index}>
                      <ShootPoint shoot={shoot} />
                    </Fragment>
                  ))}
                </>
              ),
              zone: <ZoneBlock shoots={shoots} />,
              all: (
                <>
                  {shoots.map((shoot, index) => (
                    <Fragment key={index}>
                      <ShootPoint shoot={shoot} />
                    </Fragment>
                  ))}
                  <ZoneBlock shoots={shoots} />
                </>
              ),
            }[type]
          }
        </Box>
      </Grid>
    </Grid>
  );
};

interface PropsZone {
  shoots: Array<Shoot>;
}
const ZoneBlock = ({ shoots }: PropsZone) => {
  const zones: Array<Zone> = [
    {
      type: "rectangular",
      positions: [
        { x: 0, y: 0 },
        { x: 6.58, y: 0 },
        { x: 6.58, y: 21.7 },
        { x: 0, y: 21.7 },
      ],
    },
    {
      type: "rectangular",
      positions: [
        { x: 6.58, y: 0 },
        { x: 20.1, y: 0 },
        { x: 20.1, y: 21.7 },
        { x: 6.58, y: 21.7 },
      ],
    },
    {
      type: "rectangular",
      positions: [
        { x: 20.1, y: 0 },
        { x: 33.91, y: 0 },
        { x: 33.91, y: 21.7 },
        { x: 20.1, y: 21.7 },
      ],
    },
    {
      type: "rectangular",
      positions: [
        { x: 33.91, y: 0 },
        { x: 65.95, y: 0 },
        { x: 65.95, y: 25 },
        { x: 33.91, y: 25 },
      ],
    },
    {
      type: "rectangular",
      positions: [
        { x: 33.91, y: 25 },
        { x: 65.95, y: 25 },
        { x: 65.95, y: 41.2 },
        { x: 33.91, y: 41.2 },
      ],
    },
    {
      type: "rectangular",
      positions: [
        { x: 65.95, y: 0 },
        { x: 79.83, y: 0 },
        { x: 79.83, y: 21.7 },
        { x: 65.95, y: 21.7 },
      ],
    },
    {
      type: "rectangular",
      positions: [
        { x: 79.83, y: 0 },
        { x: 93.4, y: 0 },
        { x: 93.4, y: 21.7 },
        { x: 79.83, y: 21.7 },
      ],
    },
    {
      type: "rectangular",
      positions: [
        { x: 93.4, y: 0 },
        { x: 100, y: 0 },
        { x: 100, y: 21.7 },
        { x: 93.4, y: 21.7 },
      ],
    },
  ];

  const shootExtRight = shoots.filter(
    (el) =>
      el.x >= 65.95 &&
      el.x < 93.4 &&
      el.y >= 21.7 &&
      el.y < 55.6 &&
      Math.pow(el.x - 65.95, 2) / Math.pow(34.2, 2) +
        Math.pow(el.y - 21.7, 2) / Math.pow(27.34, 2) <=
        1 &&
      el.type === TypeShoot.twoptsext
  ).length;

  const shootExtLeft = shoots.filter(
    (el) =>
      el.x >= 6.58 &&
      el.x < 33.91 &&
      el.y >= 21.7 &&
      el.y < 55.6 &&
      Math.pow(el.x - 33.91, 2) / Math.pow(34.2, 2) +
        Math.pow(el.y - 21.7, 2) / Math.pow(27.34, 2) <=
        1 &&
      el.type === TypeShoot.twoptsext
  ).length;

  const shootExtFront = shoots.filter(
    (el) =>
      el.x >= 33.91 &&
      el.x < 65.91 &&
      el.y >= 41.2 &&
      el.type === TypeShoot.twoptsext
  ).length;

  const shootThreePtsFront = shoots.filter(
    (el) => el.x >= 33.91 && el.x < 65.91 && el.type === TypeShoot.threepts
  ).length;

  const shootThreePtsLeft = shoots.filter(
    (el) => el.x < 33.91 && el.y >= 21.7 && el.type === TypeShoot.threepts
  ).length;

  const shootThreePtsRight = shoots.filter(
    (el) => el.x >= 65.91 && el.y >= 21.7 && el.type === TypeShoot.threepts
  ).length;

  return (
    <>
      {zones.map((zone) => {
        const x = zone.positions.map((el) => el.x);
        const y = zone.positions.map((el) => el.y);
        const xMax = Math.max(...x);
        const xMin = Math.min(...x);
        const yMax = Math.max(...y);
        const yMin = Math.min(...y);
        const numberShoot = getShootsZone(shoots, zone);
        const percentShoot = (numberShoot * 100) / shoots.length;

        return (
          <Box
            sx={{
              border: "3px solid white",
              borderSpacing: 0,
              width: percent(xMax - xMin),
              height: percent(yMax - yMin),
              position: "absolute",
              top: percent(yMin),
              left: percent(xMin),
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              p: px(2),
            }}
          >
            <Typography variant="h6">{numberShoot}</Typography>
            <Typography variant="h6">{percentShoot.toFixed(1)}%</Typography>
          </Box>
        );
      })}

      <Box
        sx={{
          position: "absolute",
          top: percent(41),
          left: percent(33.75),
          width: percent(32.35),
        }}
      >
        <CourtExteriorFront />
        <Box
          sx={{
            position: "absolute",
            top: percent(15),
            left: percent(42),
            textAlign: "center",
          }}
        >
          <Typography variant="h6">{shootExtFront}</Typography>
          <Typography variant="h6">
            {((shootExtFront * 100) / shoots.length).toFixed(1)}%
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: percent(21.7),
          left: percent(6),
          width: percent(28.4),
        }}
      >
        <CourtExteriorLeft />
        <Box
          sx={{
            position: "absolute",
            top: percent(21.69),
            left: percent(50),
            textAlign: "center",
          }}
        >
          <Typography variant="h6">{shootExtLeft}</Typography>
          <Typography variant="h6">
            {((shootExtLeft * 100) / shoots.length).toFixed(1)}%
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: percent(21.7),
          left: percent(65.4),
          width: percent(29.5),
        }}
      >
        <CourtExteriorRight />
        <Box
          sx={{
            position: "absolute",
            top: percent(21.69),
            left: percent(30),
            textAlign: "center",
          }}
        >
          <Typography variant="h6">{shootExtRight}</Typography>
          <Typography variant="h6">
            {((shootExtRight * 100) / shoots.length).toFixed(1)}%
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: percent(21.7),
          left: percent(0),
          width: percent(37),
        }}
      >
        <LeftThreePoint />
        <Box
          sx={{
            position: "absolute",
            top: percent(50),
            left: percent(40),
            textAlign: "center",
          }}
        >
          <Typography variant="h6">{shootThreePtsLeft}</Typography>
          <Typography variant="h6">
            {((shootThreePtsLeft * 100) / shoots.length).toFixed(1)}%
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: percent(21.7),
          left: percent(62.9),
          width: percent(37),
        }}
      >
        <RightThreePoint />
        <Box
          sx={{
            position: "absolute",
            top: percent(50),
            left: percent(40),
            textAlign: "center",
          }}
        >
          <Typography variant="h6">{shootThreePtsRight}</Typography>
          <Typography variant="h6">
            {((shootThreePtsRight * 100) / shoots.length).toFixed(1)}%
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: percent(70),
          left: percent(47.3),
          textAlign: "center",
        }}
      >
        <Typography variant="h6">{shootThreePtsFront}</Typography>
        <Typography variant="h6">
          {((shootThreePtsFront * 100) / shoots.length).toFixed(1)}%
        </Typography>
      </Box>
    </>
  );
};
