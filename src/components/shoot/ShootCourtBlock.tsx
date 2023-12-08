import { Grid, Box } from "@mui/material";
import { Fragment } from "react";
import halfCourtLeft from "src/assets/halfCourtLeft.png";
import halfCourtRight from "src/assets/halfCourtRight.png";
import { Shoot } from "src/models/Shoot";
import { ShootPoint } from "./ShootPoint";

interface Props {
  shootsLeft: Array<Shoot>;
  shootsRight: Array<Shoot>;
}

export const ShootCourtBlock = ({ shootsLeft, shootsRight }: Props) => {
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "50%",
          }}
        >
          <img src={halfCourtLeft} width="100%" />
          {shootsLeft.map((shoot, index) => (
            <Fragment key={index}>
              <ShootPoint shoot={shoot} rotate="left" />
            </Fragment>
          ))}
        </Box>
        <Box
          sx={{
            position: "relative",
            width: "50%",
          }}
        >
          <img src={halfCourtRight} width="100%" />
          {shootsRight.map((shoot, index) => (
            <Fragment key={index}>
              <ShootPoint shoot={shoot} rotate="right" />
            </Fragment>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};
