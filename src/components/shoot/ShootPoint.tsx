import { Box } from "@mui/material";
import { percent, px } from "csx";
import { Shoot } from "src/models/Shoot";
import { getColorShoot } from "src/utils/calcul";
import { getBreakpoint } from "src/utils/mediaQuery";

interface Props {
  shoot: Shoot;
  rotate?: "left" | "right";
}

export const ShootPoint = ({ shoot, rotate }: Props) => {
  const breakpoint = getBreakpoint();

  const color = getColorShoot(shoot.time);
  let x = shoot.x;
  let y = shoot.y;
  if (rotate) {
    if (rotate === "left") {
      x = shoot.y;
      y = 100 - shoot.x;
    } else {
      x = 100 - shoot.y;
      y = shoot.x;
    }
  }

  const getSize = () => {
    let size = 12;
    switch (breakpoint) {
      case "xs":
        size = 5;
        break;
      case "sm":
        size = 8;
        break;
    }
    return size;
  };

  return (
    <Box
      sx={{
        position: "absolute",
        left: percent(x),
        top: percent(y),
        transform: "translate(-50%, -50%)",
        backgroundColor: color,
        width: px(getSize()),
        height: px(getSize()),
        border: `3px solid ${color}`,
        borderRadius: percent(50),
        boxShadow: "0 0 0 2px #fff",
      }}
    />
  );
};
